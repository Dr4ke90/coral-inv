import { fetchEmployees } from "@/features/employees/api/fetchEmployees";
import { Employee } from "@/features/employees/types/employee.type";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = () => {
  const { data, isLoading, isError } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
