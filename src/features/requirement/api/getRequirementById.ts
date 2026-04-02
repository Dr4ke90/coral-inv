import axios from "axios";
import { Requirement } from "../types/requiment.type";

export const getRequirmentSheetById = async (
  id: string,
): Promise<Requirement> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_REQUIREMENTS}/${id}`,
  );
  return data.data;
};

export const getRequirementDocx = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_REQUIREMENTS}/${id}/docx`,
  );
  return data.data;
};
