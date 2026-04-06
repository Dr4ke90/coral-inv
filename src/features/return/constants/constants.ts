import { HandoverSheet } from "@/types/handoverSheet.type";

export const RETURN_PREFIX = "R";

export const EQUIPMENT_INITIAL_STATE: EquipmentType = {
  id: "",
  type: "",
  model: "",
  series: "",
  status: "",
};

export const RETURN_SHEET_INITIAL_STATE: Partial<HandoverSheet> = {
  id: "",
  date: "",
  handoverPersonId: "",
  recipientPersonId: "",
  projectId: "",
  eqList: [],
};
