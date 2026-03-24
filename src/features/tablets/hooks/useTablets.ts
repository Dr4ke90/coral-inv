import { useQuery } from "@tanstack/react-query";
import { Tablet } from "../types/tablet.type";
import { fetchAllTablets } from "../api/fetchAllTablets";

export const useTablets = () => {
  const { data, isLoading, isError } = useQuery<Tablet[]>({
    queryKey: ["tablets"],
    queryFn: fetchAllTablets,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
