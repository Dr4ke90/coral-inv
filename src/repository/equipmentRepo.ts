import EquipmentModel from "@/models/equipmentBaseSchema";
import { ClientSession } from "mongoose";

export async function getAllEquipment() {
  return await EquipmentModel.find({});
}

export async function getEquipmentById(id: string) {
  return await EquipmentModel.findOne({ id });
}

export async function createEquipment(
  data: EquipmentType,
  session?: ClientSession,
) {
  return await EquipmentModel.create([data], { session });
}

export async function updateEquipmentById(id: string, data: any) {
  return await EquipmentModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}

export async function updateEquipmentDataInTransaction(
  employeeId: string,
  projectId: string,
  pvId: string,
  eqList: string[],
  session: ClientSession,
) {
  return await EquipmentModel.updateMany(
    { id: { $in: eqList } },
    {
      $set: {
        custodianId: employeeId,
        projectId: projectId,
      },
      $push: { pvRef: pvId },
    },
    { session },
  );
}
