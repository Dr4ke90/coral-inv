import axios from "axios";
import { MobilePhone } from "../types/phones.type";

export const postMobilePhone = async (
  payloads: Partial<MobilePhone>[],
): Promise<MobilePhone[]> => {
  const promises = payloads.map((payload) =>
    axios.post(`${process.env.NEXT_PUBLIC_API_IT_PHONES}`, payload),
  );

  const responses = await Promise.all(promises);

  return responses.map((response) => response.data.data);
};
