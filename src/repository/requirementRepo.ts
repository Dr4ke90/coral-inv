import { Employee } from "@/features/employees/types/employee.type";
import { ClientSession } from "mongoose";
import RequirementModel from "@/models/requirement.model";

export async function getAllRequirements() {
  return await RequirementModel.find({});
}

export async function getRequirementById(id: string) {
  return await RequirementModel.findOne({ id });
}

export async function createRequirement(
  data: Employee,
  session?: ClientSession,
) {
  return await RequirementModel.create([data], { session });
}

export async function updateRequirementById(id: string, data: any) {
  return await RequirementModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}
