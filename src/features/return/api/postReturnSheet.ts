import { HandoverSheet } from "@/types/handoverSheet.type";
import axios from "axios";

export const postReturnSheet = async (
  payload: Partial<HandoverSheet>,
): Promise<HandoverSheet> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_RETURNS}`,
    payload,
  );
  return data.data;
};
