import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export const HANDOVER_SHEET_INITIAL_STATE: Partial<HandoverSheet> = {
  id: "",
  date: "",
  handoverPersonId: "",
  recipientPersonId: "",
  projectId: "",
  eqList: [],
};
