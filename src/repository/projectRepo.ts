import { EmployeeType } from "@/types/employee.type";
import { ClientSession } from "mongoose";
import ProjectModel from "@/models/project.model";

export async function getAllProjects() {
  return await ProjectModel.find({}).lean();
}

export async function getProjectById(id: string) {
  return await ProjectModel.findOne({ id });
}

export async function createProject(
  data: EmployeeType,
  session?: ClientSession,
) {
  return await ProjectModel.create([data], { session });
}

export async function updateProjectById(id: string, data: any) {
  return await ProjectModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}
