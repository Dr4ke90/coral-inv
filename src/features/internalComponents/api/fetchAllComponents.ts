import axios from "axios";
import { CategoryType } from "../types/category.type";

export const fetchAllComponents = async (): Promise<CategoryType[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_COMPONENTS}`,
  );
  return data.data;
};
