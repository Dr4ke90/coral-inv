import axios from "axios";
import { Requirement } from "../types/requirementInterface";

export const getRequirmentSheetById = async (
  id: string,
): Promise<Requirement> => {
  const { data } = await axios.get(`/api/requirement/${id}`);
  return data.data;
};
