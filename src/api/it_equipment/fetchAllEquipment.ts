import axios from "axios";
import { EnrichedEquipmentType } from "@/types/enrichedEquipment.type";

export const fetchAllEquipment = async (): Promise<EnrichedEquipmentType[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}`,
  );
  return data.data;
};
