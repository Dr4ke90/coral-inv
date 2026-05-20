import axios from "axios";
import { EntryType } from "@/types/entry.type";

export const updateEntry = async (
  id: string,
  payload: Partial<EntryType>,
): Promise<EntryType> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_ENTRIES}/${id}`,
    payload,
  );
  return data.data;
};
