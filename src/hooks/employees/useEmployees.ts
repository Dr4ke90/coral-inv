import { fetchEmployees } from "@/api/employees/fetchEmployees";
import { EmployeeType } from "@/types/employee.type";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = () => {
  const { data, isLoading, isError } = useQuery<EmployeeType[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
