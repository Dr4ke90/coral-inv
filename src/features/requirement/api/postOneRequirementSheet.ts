import axios from "axios";
import { Requirement } from "../types/requiment.type";

export const postOneRequirementSheet = async (
  payload: Partial<Requirement>,
): Promise<Requirement> => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_API_REQUIREMENTS ?? "",
    payload,
  );
  return data.data;
};
