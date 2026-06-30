import * as equipmentRepository from "@/repository/equipmentRepo";
import * as employeeRepo from "@/repository/employeeRepo";
import * as projectRepo from "@/repository/projectRepo";
import * as entriesRepo from "@/repository/entriesRepo";
import { EquipmentType } from "@/types/equipment.type";
import { ClientSession } from "mongoose";

export async function readAllEquipments() {
  const [equipments, employees, projects, entries] = await Promise.all([
    equipmentRepository.getAllEquipment(),
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

  const refInvoiceOptions = entries.map((e) => e.sn);

  const enrichedEquipments = equipments.map((eq) => {
    const entryInfo = itemToEntryMap.get(eq.id);

    return {
      ...eq,
      custodianName: employeeMap.get(eq.custodianId) || "-",
      projectName: projectMap.get(eq.projectId) || "-",
      requirementId: entryInfo?.requirementId || "-",
      entryId: entryInfo?.id || "-",
      refInvoice: entryInfo?.sn || eq.refInvoice,
      refInvoiceOptions: refInvoiceOptions || [],
    };
  });

  return enrichedEquipments;
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
