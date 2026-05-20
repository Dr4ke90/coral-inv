import { ClientSession } from "mongoose";
import * as tabletRepository from "@/repository/tabletRepo";
import { MobileDevicesType } from "@/types/mobileDevices.type";

export async function readAllTablets() {
  return await tabletRepository.getAllTablets();
}

export async function readTabletById(id: string) {
  return await tabletRepository.getTabletById(id);
}

export async function addTablet(data: MobileDevicesType) {
  return await tabletRepository.createTablet(data);
}

export async function updateTablet(id: string, data: Partial<MobileDevicesType>) {
  return await tabletRepository.updateTabletById(id, data);
}

export async function updateTabletDataInTransaction(
  employeeId: string,
  projectId: string,
  pvId: string,
  eqList: string[],
  session: ClientSession,
) {
  return await tabletRepository.updateTabletDataInTransaction(
    employeeId,
    projectId,
    pvId,
    eqList,
    session,
  );
}
