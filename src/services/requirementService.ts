import * as requirementRepository from "@/repository/requirementRepo";
import { Requirement } from "@/types/requiment.type";

export async function readAllRequirements() {
  return await requirementRepository.getAllRequirements();
}

export async function readRequirementById(id: string) {
  return await requirementRepository.getRequirementById(id);
}

export async function addRequirement(data: any) {
  return await requirementRepository.createRequirement(data);
}

export async function updateRequirement(
  id: string,
  payload: Partial<Requirement>,
) {
  console.log("PAYLOAD", payload);

  return await requirementRepository.updateRequirementById(id, payload);
}
