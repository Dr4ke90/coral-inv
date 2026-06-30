import discriminatorsMap from "@/constants/discriminatorsMap";
import EquipmentModel from "@/models/equipmentBaseSchema";
import { EquipmentType } from "@/types/equipment.type";
import { ClientSession } from "mongoose";

export async function getAllEquipment() {
  return await EquipmentModel.find({}).lean();
}

export async function getEquipmentById(id: string) {
  return await EquipmentModel.findOne({ id });
}

export async function createEquipment(
  data: EquipmentType,
  session?: ClientSession,
) {
  const type = data.type;
  const Model = discriminatorsMap[type];

  if (Model) {
    const [createdEquipment] = await Model.create([data], { session });
    return createdEquipment;
  } else {
    const [createdEquipment] = await EquipmentModel.create([data], { session });
    return createdEquipment;
  }
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
