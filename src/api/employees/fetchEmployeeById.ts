import axios from "axios";
import { EmployeeType } from "../../types/employee.type";

export const fetchEmployeeById = async (id: string): Promise<EmployeeType> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_EMPLOYEES}/${id}`,
  );
  return data.data;
};
