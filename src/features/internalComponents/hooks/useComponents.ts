import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "../types/category.type";
import { fetchAllComponents } from "../api/fetchAllComponents";

export const useComponents = () => {
  const { data, isLoading, isError } = useQuery<CategoryType[]>({
    queryKey: ["internalComponents"],
    queryFn: fetchAllComponents,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
