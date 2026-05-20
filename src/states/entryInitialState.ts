import { EntryType } from "@/types/entry.type";

export const ENTRY_INITIAL_STATE: Partial<EntryType> = {
  id: "",
  type: "",
  sn: "",
  date: "",
  vendor: "",
  total: 0,
  filePreview: false,
  items: [],
};
