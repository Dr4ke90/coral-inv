import axios from "axios";
import { MobilePhone } from "../types/phones.type";

export const fetchMobilePhoneById = async (id: string): Promise<MobilePhone> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_PHONES}/${id}`,
  );
  return data.data;
};
