import * as returnRepository from "@/repository/returnRepo";
import mongoose from "mongoose";
import { updateEquipmentDataInTransaction } from "./equipmentService";
import { updateTabletDataInTransaction } from "./tabletService";
import { updateMobilePhoneDataInTransaction } from "./mobilePhoneService";

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
    const newHandover = await returnRepository.createReturn(body, session);

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
