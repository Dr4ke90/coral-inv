import mongoose from "mongoose";
import * as handoverRepository from "@/repository/handoverRepo";
import { updateEquipmentDataInTransaction } from "./equipmentService";
import { updateTabletDataInTransaction } from "./tabletService";
import { updateMobilePhoneDataInTransaction } from "./mobilePhoneService";

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

    const itEquipment = body.eqList.filter((eq: string) =>
      eq.startsWith("CIT"),
    );
    const tabletEquipment = body.eqList.filter((eq: string) =>
      eq.startsWith("CTB"),
    );
    const mobilePhoneEquipment = body.eqList.filter((eq: string) =>
      eq.startsWith("CTM"),
    );
    if (itEquipment.length > 0) {
      const res = await updateEquipmentDataInTransaction(
        body.recipientPersonId,
        body.projectId,
        newHandover.id,
        itEquipment,
        session,
      );
      if (res.matchedCount === 0) throw new Error("Echipamente IT negăsite.");
    }

    if (tabletEquipment.length > 0) {
      const res = await updateTabletDataInTransaction(
        body.recipientPersonId,
        body.projectId,
        newHandover.id,
        tabletEquipment,
        session,
      );
      if (res.matchedCount === 0) throw new Error("Tablete negăsite.");
    }

    if (mobilePhoneEquipment.length > 0) {
      const res = await updateMobilePhoneDataInTransaction(
        body.recipientPersonId,
        body.projectId,
        newHandover.id,
        mobilePhoneEquipment,
        session,
      );
      if (res.matchedCount === 0) throw new Error("Telefoane negăsite.");
    }

    await session.commitTransaction();
    return newHandover;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
