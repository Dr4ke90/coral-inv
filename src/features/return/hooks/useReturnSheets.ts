import { useQuery } from "@tanstack/react-query";
import { fetchAllReturnSheets } from "../api/fetchAllReturnSheets";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";

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
