import { EmployeeType } from "../types/employee.type";

export const employeeFactory = (
  values: Record<string, any>,
  userName: string | undefined,
  nextId: string,
): Partial<EmployeeType> => {
  const { id, eqList, ...rest } = values;

  return {
    id: nextId,
    createdBy: userName,
    eqList: [],
    ...rest,
  };
};
