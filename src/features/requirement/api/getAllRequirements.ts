import axios from "axios";
import { Requirement } from "../types/requirementInterface";

export const getAllRequirements = async (): Promise<Requirement[]> => {
  const { data } = await axios.get("/api/requirement");
  return data.data;
};
