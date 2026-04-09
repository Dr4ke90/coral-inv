import { useQuery } from "@tanstack/react-query";
import { MobilePhone } from "../features/mobilePhones/types/phones.type";
import { fetchAllMobilePhones } from "../features/mobilePhones/api/fetchAllMobilePhones";

export const useMobilePhones = () => {
  const { data, isLoading, isError } = useQuery<MobilePhone[]>({
    queryKey: ["mobilePhones"],
    queryFn: fetchAllMobilePhones,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
