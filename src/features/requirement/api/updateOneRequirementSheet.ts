import axios from "axios";
import { Requirement } from "../types/requiment.type";

export const updateOneRequirementSheet = async (
  id: string,
  payload: Partial<Requirement>,
): Promise<Requirement> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_REQUIREMENTS}/${id}`,
    payload,
  );
  return data.data;
};
