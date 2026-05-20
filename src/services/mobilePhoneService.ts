import * as mobilePhoneRepository from "@/repository/mobilePhoneRepo";
import { MobileDevicesType } from "@/types/mobileDevices.type";
import { ClientSession } from "mongoose";

export async function readAllMobilePhones() {
  return await mobilePhoneRepository.getAllMobilePhones();
}

export async function readMobilePhoneById(id: string) {
  return await mobilePhoneRepository.getMobilePhoneById(id);
}

export async function addMobilePhone(data: MobileDevicesType) {
  return await mobilePhoneRepository.createMobilePhone(data);
}

export async function updateMobilePhone(
  id: string,
  data: Partial<MobileDevicesType>,
) {
  return await mobilePhoneRepository.updateMobilePhoneById(id, data);
}

export async function updateMobilePhoneDataInTransaction(
  employeeId: string,
  projectId: string,
  pvId: string,
  eqList: string[],
  session: ClientSession,
) {
  return await mobilePhoneRepository.updateMobilePhoneDataInTransaction(
    employeeId,
    projectId,
    pvId,
    eqList,
    session,
  );
}
