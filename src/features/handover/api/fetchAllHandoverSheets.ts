import { HandoverSheet } from "@/types/handoverSheet.type";
import axios from "axios";

export const fetchAllHandoverSheets = async (): Promise<HandoverSheet[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HANDOVERS}`);
  return data.data;
};
