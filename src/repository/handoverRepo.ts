import HandoverSheetModel from "@/models/handoversSheet.model";
import { ClientSession } from "mongoose";

export async function getAllHandovers() {
  return await HandoverSheetModel.find({});
}

export async function getOneHandover(id: string) {
  return await HandoverSheetModel.findOne({ id });
}

export async function updateHandover(id: string, updateData: any) {
  return await HandoverSheetModel.findOneAndUpdate({ id }, updateData, {
    new: true,
    runValidators: true,
  });
}

export async function createHandover(data: any, session: ClientSession) {
  const [newHandover] = await HandoverSheetModel.create([data], { session });
  return newHandover;
}
