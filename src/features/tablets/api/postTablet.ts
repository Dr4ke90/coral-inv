import axios from "axios";
import { Tablet } from "../types/tablet.type";

export const postTablet = async (
  payloads: Partial<Tablet>[],
): Promise<Tablet[]> => {
  const promises = payloads.map((payload) =>
    axios.post(`${process.env.NEXT_PUBLIC_API_IT_TABLETS}`, payload),
  );

  const responses = await Promise.all(promises);

  return responses.map((response) => response.data.data);
};
