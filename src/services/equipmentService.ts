import discriminatorsMap from "@/constants/discriminatorsMap";
import EquipmentModel from "@/models/equipmentBaseSchema";
import * as equipmentRepository from "@/repository/equipmentRepo";
import { EquipmentType } from "@/types/equipment.type";
import { ClientSession } from "mongoose";

export async function readAllEquipment() {
  return await equipmentRepository.getAllEquipment();
}

export async function readEquipmentById(id: string) {
  return await equipmentRepository.getEquipmentById(id);
}

export async function addEquipment(body: EquipmentType) {
  return await equipmentRepository.createEquipment(body);
}

export async function addBatchEquipment(
  items: EquipmentType[],
  session?: ClientSession,
) {
  return await Promise.all(
    items.map(async (item) => {
      return await equipmentRepository.createEquipment(item, session);
    }),
  );
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
