import { ClientSession } from "mongoose";
import * as tabletRepository from "@/repository/tabletRepo";
import * as employeeRepo from "@/repository/employeeRepo";
import * as projectRepo from "@/repository/projectRepo";
import * as entriesRepo from "@/repository/entriesRepo";
import { MobileDevicesType } from "@/types/mobileDevices.type";

export async function readAllTablets() {
  const [tablets, employees, projects, entries] = await Promise.all([
    tabletRepository.getAllTablets(),
    employeeRepo.getAllEmployees(),
    projectRepo.getAllProjects(),
    entriesRepo.getAllEntries(),
  ]);

  const employeeMap = new Map();
  employees.forEach((emp) => employeeMap.set(emp.id, emp.name));

  const projectMap = new Map();
  projects.forEach((proj) => projectMap.set(proj.id, proj.name));

  const itemToEntryMap = new Map();
  entries.forEach((entry) => {
    entry.items?.forEach((itemId: string) => itemToEntryMap.set(itemId, entry));
  });

  const enrichedTablets = tablets.map((tab: any) => {
    const entryInfo = itemToEntryMap.get(tab.id);

    return {
      ...tab,
      custodianName: employeeMap.get(tab.custodianId) || "-",
      projectName: projectMap.get(tab.projectId) || "-",
      snInvoice: entryInfo?.sn,
    };
  });

  return enrichedTablets;
}

export async function readTabletById(id: string) {
  return await tabletRepository.getTabletById(id);
}

export async function addTablet(data: MobileDevicesType) {
  return await tabletRepository.createTablet(data);
}

export async function updateTablet(
  id: string,
  data: Partial<MobileDevicesType>,
) {
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
