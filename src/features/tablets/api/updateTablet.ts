import axios from "axios";
import { Tablet } from "../types/tablet.type";

export const updateTablet = async (
  id: string,
  payload: Partial<Tablet>,
): Promise<Tablet> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_IT_TABLETS}/${id}`,
    payload,
  );
  return data.data;
};
