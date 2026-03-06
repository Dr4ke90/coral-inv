import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import axios from "axios";

export const fetchHandoverSheetById = async (
  id: string,
): Promise<HandoverSheet> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HANDOVERS}/${id}`,
  );
  return data.data;
};
