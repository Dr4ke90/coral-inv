import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import axios from "axios";

export const updateHandoverSheet = async (
  id: string,
  payload: Partial<HandoverSheet>,
): Promise<HandoverSheet> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_HANDOVERS}/${id}`,
    payload,
  );
  return data.data;
};
