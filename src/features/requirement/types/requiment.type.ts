import { RequirementStatus } from "./requirementStatus";
import { ResourceType } from "./resource.type";

export interface Requirement {
  id: string;
  date: Date | string;
  createdBy: string;
  totalCollectedPrice: number | string;
  projectId: string;
  status: RequirementStatus;
  items: ResourceType[];
}
