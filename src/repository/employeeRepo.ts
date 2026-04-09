import { Employee } from "@/features/employees/types/employee.type";
import EmployeeModel from "@/models/employee.model";
import { ClientSession } from "mongoose";

export async function getAllEmployees() {
  return await EmployeeModel.find({});
}

export async function getEmployeeById(id: string) {
  return await EmployeeModel.findOne({ id });
}

export async function createEmployee(data: Employee, session?: ClientSession) {
  return await EmployeeModel.create([data], { session });
}

export async function updateEmployeeById(id: string, data: any) {
  return await EmployeeModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}
