import { useQuery } from "@tanstack/react-query";
import { getAllRequirements } from "../api/getAllRequirements";
import { Requirement } from "../types/requiment.type";

export const useRequirementData = () => {
  const { data, isLoading, isError } = useQuery<Requirement[]>({
    queryKey: ["requirements"],
    queryFn: getAllRequirements,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
