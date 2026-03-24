import axios from "axios";
import { MobilePhone } from "../types/phones.type";

export const updateMobilePhone = async (
  id: string,
  payload: Partial<MobilePhone>,
): Promise<MobilePhone> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_IT_PHONES}/${id}`,
    payload,
  );
  return data.data;
};
