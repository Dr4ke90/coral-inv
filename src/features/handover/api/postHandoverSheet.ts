import { HandoverSheet } from "@/types/handoverSheet.type";
import axios from "axios";

export const postHandoverSheet = async (
  payload: Partial<HandoverSheet>,
): Promise<HandoverSheet> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_HANDOVERS}`,
    payload,
  );
  return data.data;
};
