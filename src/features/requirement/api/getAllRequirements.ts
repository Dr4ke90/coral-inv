import axios from "axios";
import { RequirementType } from "../types/requiment.type";

export const getAllRequirements = async (): Promise<RequirementType[]> => {
  const { data } = await axios.get("/api/requirement");
  return data.data;
};
