import axios from "axios";
import { RequirementType } from "../types/requiment.type";

export const getRequirmentSheetById = async (
  id: string,
): Promise<RequirementType> => {
  const { data } = await axios.get(`/api/requirement/${id}`);
  return data.data;
};
