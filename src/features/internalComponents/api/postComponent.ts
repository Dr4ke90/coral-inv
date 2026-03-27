import axios from "axios";
import { CategoryType } from "../types/category.type";

export const postComponent = async (
  payloads: Partial<CategoryType>[],
): Promise<CategoryType[]> => {
  const promises = payloads.map((payload) =>
    axios.post(`${process.env.NEXT_PUBLIC_API_IT_COMPONENTS}`, payload),
  );

  const responses = await Promise.all(promises);

  return responses.map((response) => response.data.data);
};
