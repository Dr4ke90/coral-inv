import * as employeeRepository from "@/repository/employeeRepo";
import * as equipRepository from "@/repository/equipmentRepo";

export async function readAllEmployees() {
  const [employees, equipment] = await Promise.all([
    employeeRepository.getAllEmployees(),
    equipRepository.getAllEquipment(),
  ]);

  const enrichedEmployees = employees.map((employee) => {
    const equipmentCount = equipment.filter(
      (eq: any) => eq.custodianId === employee.id,
    ).length;

    return {
      ...employee,
      eqNo: equipmentCount,
    };
  });

  return enrichedEmployees;
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
