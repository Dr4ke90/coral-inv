import { Requirement } from "./requirementInterface";

export interface ItemsListContextType {
  items: Requirement["items"];
  addItem: (item: Record<string, any>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}
