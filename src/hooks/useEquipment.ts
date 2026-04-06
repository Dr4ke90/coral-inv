import { useQuery } from "@tanstack/react-query";
import { Equipment } from "../features/equipment-it/types/equipment.type";
import { fetchAllEquipment } from "../features/equipment-it/api/fetchAllEquipment";

export const useEquipment = () => {
  const { data, isLoading, isError } = useQuery<Equipment[]>({
    queryKey: ["equipmentIt"],
    queryFn: fetchAllEquipment,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
