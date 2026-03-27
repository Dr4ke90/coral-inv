import { ComponentType } from "./component.type";

export interface CategoryType {
  id: string;
  type: string;
  brand: string;
  model: string;
  items: ComponentType[];
  createdAt: Date;
  createdBy: string;
}
