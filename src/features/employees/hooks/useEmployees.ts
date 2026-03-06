import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api/fetchEmployees";
import { Employee } from "../types/employee.type";

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
