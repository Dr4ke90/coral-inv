import axios from "axios";
import { Employee } from "../types/employee.type";

export const fetchEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_EMPLOYEES}`);
  return data.data;
};
