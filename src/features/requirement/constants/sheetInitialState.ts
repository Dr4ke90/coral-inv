import { Requirement } from "../types/requiment.type";

export const REQUIREMENT_SHEET_INITIAL_STATE: Partial<Requirement> = {
  id: "",
  date: "",
  createdBy: "",
  projectId: "",
  totalCollectedPrice: "",
  status: "",
  items: [],
};
