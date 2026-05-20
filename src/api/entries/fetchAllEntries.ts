import { EntryType } from "@/types/entry.type";
import axios from "axios";

export const fetchAllEntries = async (): Promise<EntryType[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENTRIES}`);
  return data.data;
};
