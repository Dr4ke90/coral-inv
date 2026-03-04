import { useQuery } from "@tanstack/react-query";
import { getAllRequirements } from "../api/getAllRequirements";
import { RequirementType } from "../types/requiment.type";

export const useRequirementData = () => {
  const { data, isLoading, isError } = useQuery<RequirementType[]>({
    queryKey: ["requirement"],
    queryFn: getAllRequirements,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
