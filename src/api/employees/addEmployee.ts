import axios from "axios";
import { EmployeeType } from "../../types/employee.type";

export const addEmployee = async (
  payload: Partial<EmployeeType>,
): Promise<EmployeeType> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_EMPLOYEES}`,
    payload,
  );
  return data.data;
};
