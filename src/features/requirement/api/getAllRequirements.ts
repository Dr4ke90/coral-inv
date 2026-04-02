import axios from "axios";
import { Requirement } from "../types/requiment.type";

export const getAllRequirements = async (): Promise<Requirement[]> => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_REQUIREMENTS ?? "",
  );
  return data.data;
};
