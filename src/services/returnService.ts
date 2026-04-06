import * as returnRepository from "@/repository/returnRepo";
import * as equipmentRepository from "@/repository/equipmentRepo";
import mongoose from "mongoose";

export async function readAllReturnSheets() {
  return await returnRepository.getAllReturns();
}

export async function readReturnSheetDetails(id: string) {
  const response = await returnRepository.getOneReturn(id);

  if (!response) {
    const error = new Error("Return sheet not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return response;
}

export async function updateReturnDetails(id: string, updateData: any) {
  const updatedReturn = await returnRepository.updateReturn(id, updateData);

  if (!updatedReturn) {
    const error = new Error("Return sheet not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return updatedReturn;
}

export async function processReturn(body: any) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newReturn = await returnRepository.createReturn(body, session);

    const updateResult =
      await equipmentRepository.updateEquipmentDataInTransaction(
        body.recipientPersonId,
        body.projectId,
        newReturn.id,
        body.eqList,
        session,
      );

    if (updateResult.matchedCount === 0)
      throw new Error("Niciun echipament nu a fost găsit.");

    await session.commitTransaction();
    return newReturn;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
