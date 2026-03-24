import axios from "axios";
import { Tablet } from "../types/tablet.type";

export const fetchTabletById = async (id: string): Promise<Tablet> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_IT_TABLETS}/${id}`,
  );
  return data.data;
};
