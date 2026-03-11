import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import axios from "axios";

export const fetchReturnSheetById = async (
  id: string,
): Promise<HandoverSheet> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_RETURNS}/${id}`,
  );
  return data.data;
};
