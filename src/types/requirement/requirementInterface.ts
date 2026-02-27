import { RequirementStatus } from "./requirementStatus";

export interface Requirement {
  id: string;
  data: Date;
  createdBy: string;
  totalCollectedPrice: number;
  itemsCount: number;
  project: string;
  status: RequirementStatus;
}
