import axios from "axios";
import { Employee } from "../types/employee.type";

export const addEmployee = async (
  payload: Partial<Employee>,
): Promise<Employee> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_EMPLOYEES}`,
    payload,
  );
  return data.data;
};
