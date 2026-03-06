import { Employee } from "../types/employee.type";

export const createEmployee = (
  values: Record<string, any>,
  userName: string | undefined,
  nextId: string,
): Partial<Employee> => {
  const { id, eqList, ...rest } = values;

  return {
    id: nextId,
    createdBy: userName,
    eqList: [],
    ...rest,
  };
};
