import { useQuery } from "@tanstack/react-query";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { fetchAllHandoverSheets } from "@/api/handovers/fetchAllHandoverSheets";

export const useHandoverSheets = () => {
  const { data, isLoading, isError } = useQuery<HandoverSheet[]>({
    queryKey: ["handovers"],
    queryFn: fetchAllHandoverSheets,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
