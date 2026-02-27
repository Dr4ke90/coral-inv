import { RequirementStatus } from "./requirementStatus";

export interface Requirement {
  id: string;
  date: Date;
  createdBy: string;
  totalCollectedPrice: number;
  itemsCount: number;
  project: string;
  status: RequirementStatus;
  filePreview: boolean;
  items: string[];
}
