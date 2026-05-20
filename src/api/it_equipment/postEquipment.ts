import axios from "axios";
import { EquipmentType } from "@/types/equipment.type";

export const postEquipment = async (
  payloads: Partial<EquipmentType>[],
): Promise<EquipmentType[]> => {
  const promises = payloads.map((payload) =>
    axios.post(`${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}`, payload),
  );

  const responses = await Promise.all(promises);

  return responses.map((response) => response.data.data);
};
