import ReturnSheetModel from "@/models/returnSheets.model";
import { ClientSession } from "mongoose";

export async function getAllReturns() {
  return await ReturnSheetModel.find({});
}

export async function getOneReturn(id: string) {
  return await ReturnSheetModel.findOne({ id });
}

export async function updateReturn(id: string, updateData: any) {
  return await ReturnSheetModel.findOneAndUpdate({ id }, updateData, {
    new: true,
    runValidators: true,
  });
}

export async function createReturn(data: any, session: ClientSession) {
  const [newReturn] = await ReturnSheetModel.create([data], { session });
  return newReturn;
}
