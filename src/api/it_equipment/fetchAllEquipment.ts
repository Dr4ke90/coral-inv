import axios from "axios";
import { EquipmentType } from "@/types/equipment.type";

export const fetchAllEquipment = async (): Promise<EquipmentType[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}`,
  );
  return data.data;
};
