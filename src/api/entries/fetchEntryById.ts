import axios from "axios";
import { EntryType } from "@/types/entry.type";

export const fetchEntryById = async (id: string): Promise<EntryType> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENTRIES}/${id}`,
  );
  return data.data;
};
