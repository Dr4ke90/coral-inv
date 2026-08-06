import * as equipmentRepository from "@/repository/equipmentRepo";
import * as employeeRepo from "@/repository/employeeRepo";
import * as projectRepo from "@/repository/projectRepo";
import * as entriesRepo from "@/repository/entriesRepo";
import * as usersRepo from "@/repository/usersRepo";
import { EquipmentType } from "@/types/equipment.type";
import { ClientSession } from "mongoose";
import { EnrichedEquipmentType } from "@/types/enrichedEquipment.type";

export async function readAllEquipments(): Promise<EnrichedEquipmentType[]> {
  const [equipments, employees, projects, entries, users] = await Promise.all([
    equipmentRepository.getAllEquipment(),
    employeeRepo.getAllEmployees(),
    projectRepo.getAllProjects(),
    entriesRepo.getAllEntries(),
    usersRepo.getAllUsers(),
  ]);

  const usersMap = new Map<string, string>();
  users.forEach((user) => {
    usersMap.set(user.id, user.name);
  });

  const employeeMap = new Map<string, string>();
  employees.forEach((employee) => {
    employeeMap.set(employee.id, employee.name);
  });

  const projectMap = new Map<string, string>();
  projects.forEach((project) => {
    projectMap.set(project.id, project.name);
  });

  const itemToEntryMap = new Map<string, (typeof entries)[number]>();
  entries.forEach((entry) => {
    entry.items?.forEach((itemId: string) => {
      itemToEntryMap.set(itemId, entry);
    });
  });

  const refInvoiceOptions = entries.map((entry) => entry.sn);

  const enrichedEquipments: EnrichedEquipmentType[] = equipments.map(
    (equipment: EquipmentType) => {
      const entryInfo = itemToEntryMap.get(equipment.id);

      return {
        ...equipment,

        custodianName: employeeMap.get(equipment.custodianId ?? "") ?? "-",

        creatorName: usersMap.get(equipment.createdBy ?? "") ?? "-",

        projectName: projectMap.get(equipment.projectId ?? "") ?? "-",

        requirementId: entryInfo?.requirementId ?? "-",

        entryId: entryInfo?.id ?? "-",

        refInvoice: entryInfo?.sn ?? equipment.refInvoice ?? "-",

        refInvoiceOptions,
      };
    },
  );

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
