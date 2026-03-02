import { useQuery } from "@tanstack/react-query";
import { getAllRequirements } from "../api/getAllRequirements";
import { Requirement } from "../types/requirementInterface";

export const useRequirementData = () => {
  const { data, isLoading, isError } = useQuery<Requirement[]>({
    queryKey: ["requirement"],
    queryFn: getAllRequirements,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
