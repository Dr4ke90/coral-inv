import axios from "axios";
import { Employee } from "../types/employee.type";

export const updateEmployee = async (
  id: string,
  payload: Partial<Employee>,
): Promise<Employee> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_EMPLOYEES}/${id}`,
    payload,
  );
  return data.data;
};
