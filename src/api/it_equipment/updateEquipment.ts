import axios from "axios";
import { EquipmentType } from "@/types/equipment.type";

export const updateEquipment = async (
  id: string,
  payload: Partial<EquipmentType>,
): Promise<EquipmentType> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}/${id}`,
    payload,
  );
  return data.data;
};
