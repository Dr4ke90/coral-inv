import axios from "axios";
import { EmployeeType } from "../../types/employee.type";

export const updateEmployee = async (
  id: string,
  payload: Partial<EmployeeType>,
): Promise<EmployeeType> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_EMPLOYEES}/${id}`,
    payload,
  );
  return data.data;
};
