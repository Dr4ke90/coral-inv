import * as handoverRepository from "@/repository/handoverRepo";
import * as equipmentRepository from "@/repository/equipmentRepo";
import mongoose from "mongoose";

export async function getHandoversList() {
  return await handoverRepository.getAllHandovers();
}

export async function getHandoverDetails(id: string) {
  const handover = await handoverRepository.getOneHandover(id);

  if (!handover) {
    const error = new Error("Handover sheet not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return handover;
}

export async function updateHandoverDetails(id: string, updateData: any) {
  const updatedHandover = await handoverRepository.updateHandover(
    id,
    updateData,
  );

  if (!updatedHandover) {
    const error = new Error("Handover sheet not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return updatedHandover;
}

export async function processHandover(body: any) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newHandover = await handoverRepository.createHandover(body, session);

    const updateResult =
      await equipmentRepository.updateEquipmentDataInTransaction(
        body.recipientPersonId,
        body.projectId,
        newHandover.id,
        body.eqList,
        session,
      );

    if (updateResult.matchedCount === 0)
      throw new Error("Niciun echipament nu a fost găsit.");

    await session.commitTransaction();
    return newHandover;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
