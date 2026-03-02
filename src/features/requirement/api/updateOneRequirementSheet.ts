import axios from "axios";
import { Requirement } from "../types/requirementInterface";

export const updateOneRequirementSheet = async (
  id: string,
  payload: Partial<Requirement>,
): Promise<Requirement> => {
  const { data } = await axios.put(`/api/requirement/${id}`, payload);
  return data.data;
};
