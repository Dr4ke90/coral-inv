import axios from "axios";
import { MobilePhone } from "../types/phones.type";

export const fetchAllMobilePhones = async (): Promise<MobilePhone[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_IT_PHONES}`);
  return data.data;
};
