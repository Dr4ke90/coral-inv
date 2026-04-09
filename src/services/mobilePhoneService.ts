import MobilePhoneModel from "@/models/mobilePhone.model";
import * as mobilePhoneRepository from "@/repository/mobilePhoneRepo";
import { ClientSession } from "mongoose";

export async function readAllMobilePhones() {
  return await mobilePhoneRepository.getAllMobilePhones();
}

export async function readMobilePhoneById(id: string) {
  return await mobilePhoneRepository.getMobilePhoneById(id);
}

export async function addMobilePhone(data: any) {
  return await MobilePhoneModel.create(data);
}

export async function updateMobilePhone(id: string, data: any) {
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
