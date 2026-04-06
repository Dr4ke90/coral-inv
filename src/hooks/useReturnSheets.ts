import { useQuery } from "@tanstack/react-query";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { fetchAllReturnSheets } from "@/features/return/api/fetchAllReturnSheets";

export const useReturnSheets = () => {
  const { data, isLoading, isError } = useQuery<HandoverSheet[]>({
    queryKey: ["returns"],
    queryFn: fetchAllReturnSheets,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
