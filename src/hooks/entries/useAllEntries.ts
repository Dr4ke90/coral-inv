import { useQuery } from "@tanstack/react-query";
import { EntryType } from "@/types/entry.type";
import { fetchAllEntries } from "../../api/entries/fetchAllEntries";

export const useAllEntries = () => {
  const { data, isLoading, isError } = useQuery<EntryType[]>({
    queryKey: ["entries"],
    queryFn: fetchAllEntries,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
