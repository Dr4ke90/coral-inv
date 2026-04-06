import discriminatorsMap from "@/constants/discriminatorsMap";
import EquipmentModel from "@/models/equipment.model";
import * as equipmentRepository from "@/repository/equipmentRepo";
import { ClientSession } from "mongoose";

export async function readAllEquipment() {
  return await equipmentRepository.getAllEquipment();
}

export async function readEquipmentById(id: string) {
  return await equipmentRepository.getEquipmentById(id);
}

export async function addEquipment(data: any) {
  const type = data.type;
  const Model = discriminatorsMap[type];

  if (Model) {
    return await Model.create(data);
  } else {
    return await EquipmentModel.create(data);
  }
}

export async function updateEquipment(id: string, data: any) {
  return await equipmentRepository.updateEquipmentById(id, data);
}

export async function updateEquipmentDataInTransaction(
  employeeId: string,
  projectId: string,
  pvId: string,
  eqList: string[],
  session: ClientSession,
) {
  return await equipmentRepository.updateEquipmentDataInTransaction(
    employeeId,
    projectId,
    pvId,
    eqList,
    session,
  );
}
