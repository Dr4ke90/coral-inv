import axios from "axios";
import { CategoryType } from "../types/category.type";

export const updateComponent = async (
  id: string,
  payload: Partial<CategoryType>,
): Promise<CategoryType> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_IT_COMPONENTS}/${id}`,
    payload,
  );
  return data.data;
};
