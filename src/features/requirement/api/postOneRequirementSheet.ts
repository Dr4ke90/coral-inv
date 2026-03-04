import axios from "axios";
import { RequirementType } from "../types/requiment.type";

export const postOneRequirementSheet = async (
  payload: Partial<RequirementType>,
): Promise<RequirementType> => {
  const { data } = await axios.post("/api/requirement", payload);
  return data.data;
};
