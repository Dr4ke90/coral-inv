import { EquipmentType } from "@/types/equipment.type";
import axios from "axios";

export const fetchEquipmentById = async (
  id: string,
): Promise<EquipmentType> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}/${id}`,
  );
  return data.data;
};
