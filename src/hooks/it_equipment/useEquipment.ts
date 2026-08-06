import { useQuery } from "@tanstack/react-query";
import { fetchAllEquipment } from "../../api/it_equipment/fetchAllEquipment";
import { EnrichedEquipmentType } from "@/types/enrichedEquipment.type";

export const useEquipment = () => {
  const { data, isLoading, isError, refetch } = useQuery<
    EnrichedEquipmentType[]
  >({
    queryKey: ["equipmentIt"],
    queryFn: fetchAllEquipment,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError, refetch };
};
