import { ComponentType } from "./component.type";

export interface CategoryType {
  id: string;
  type: string;
  brand: string;
  model: string;
  config: string;
  items: ComponentType[];
  requirementId: string;
  createdAt: Date;
  createdBy: string;
}
