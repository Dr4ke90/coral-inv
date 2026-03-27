import axios from "axios";
import { CategoryType } from "../types/category.type";

export const fetchComponentById = async (id: string): Promise<CategoryType> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_COMPONENTS}/${id}`,
  );
  return data.data;
};
