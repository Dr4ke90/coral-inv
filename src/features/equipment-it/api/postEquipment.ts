import axios from "axios";
import { Equipment } from "../types/equipment.type";

export const postEquipment = async (
  payloads: Partial<Equipment>[],
): Promise<Equipment[]> => {
  const promises = payloads.map((payload) =>
    axios.post(`${process.env.NEXT_PUBLIC_API_IT_EQUIPMENT}`, payload),
  );

  const responses = await Promise.all(promises);

  return responses.map((response) => response.data.data);
};
