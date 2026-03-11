import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import axios from "axios";

export const updateReturnSheet = async (
  id: string,
  payload: Partial<HandoverSheet>,
): Promise<HandoverSheet> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_RETURNS}/${id}`,
    payload,
  );
  return data.data;
};
