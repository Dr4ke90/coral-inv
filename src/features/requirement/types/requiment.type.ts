import { RequirementStatus } from "./requirementStatus";
import { ResourceType } from "./resource.type";

export interface Requirement {
  id: string;
  date: Date | null;
  createdBy: string;
  totalCollectedPrice: number;
  projectId: string;
  status: RequirementStatus;
  items: ResourceType[];
}
