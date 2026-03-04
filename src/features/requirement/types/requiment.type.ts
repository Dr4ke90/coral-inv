import { RequirementStatus } from "./requirementStatus";

export interface RequirementType {
  id: string;
  date: Date | null;
  createdBy: string;
  totalCollectedPrice: number;
  project: string;
  status: RequirementStatus;
  filePreview: boolean;
  items: Record<string, any>[];
}
