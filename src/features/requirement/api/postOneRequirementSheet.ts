import axios from "axios";
import { Requirement } from "../types/requirementInterface";

export const postOneRequirementSheet = async (
  payload: Partial<Requirement>,
): Promise<Requirement> => {
  const { data } = await axios.post("/api/requirement", payload);
  return data.data;
};
