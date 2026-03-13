import axios from "axios";
import { Equipment } from "../types/equipment.type";

export const fetchEquipmentById = async (
  id: string,
): Promise<Equipment> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}/${id}`,
  );
  return data.data;
};
