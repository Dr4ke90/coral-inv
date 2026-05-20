import axios from "axios";
import { EmployeeType } from "../../types/employee.type";

export const fetchEmployees = async (): Promise<EmployeeType[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_EMPLOYEES}`);
  return data.data;
};
