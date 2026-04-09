import TabletModel from "@/models/tablet.model";
import { ClientSession } from "mongoose";
import * as tabletRepository from "@/repository/tabletRepo";

export async function readAllTablets() {
  return await tabletRepository.getAllTablets();
}

export async function readTabletById(id: string) {
  return await tabletRepository.getTabletById(id);
}

export async function addTablet(data: any) {
  return await TabletModel.create(data);
}

export async function updateTablet(id: string, data: any) {
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
