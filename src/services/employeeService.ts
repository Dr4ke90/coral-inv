import * as employeeRepository from "@/repository/employeeRepo";

export async function readAllEmployees() {
  return await employeeRepository.getAllEmployees();
}

export async function readEmployeeById(id: string) {
  return await employeeRepository.getEmployeeById(id);
}

export async function addEmployee(data: any) {
  return await employeeRepository.createEmployee(data);
}

export async function updateEmployee(id: string, data: any) {
  return await employeeRepository.updateEmployeeById(id, data);
}
