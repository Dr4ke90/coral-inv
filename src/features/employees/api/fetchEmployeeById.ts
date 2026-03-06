import axios from "axios";
import { Employee } from "../types/employee.type";

export const fetchEmployeeById = async (id: string): Promise<Employee> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_EMPLOYEES}/${id}`,
  );
  return data.data;
};
