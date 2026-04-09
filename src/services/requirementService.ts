import * as requirementRepository from "@/repository/requirementRepo";

export async function readAllRequirements() {
  return await requirementRepository.getAllRequirements();
}

export async function readRequirementById(id: string) {
  return await requirementRepository.getRequirementById(id);
}

export async function addRequirement(data: any) {
  return await requirementRepository.createRequirement(data);
}

export async function updateRequirement(id: string, data: any) {
  return await requirementRepository.updateRequirementById(id, data);
}
