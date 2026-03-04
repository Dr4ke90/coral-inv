import { RequirementType } from "./requiment.type";

export interface ItemsListContextType {
  items: RequirementType["items"];
  addItem: (item: Record<string, any>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}
