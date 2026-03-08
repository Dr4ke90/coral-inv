import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export interface EquipmentListType {
  eqList: HandoverSheet["eqList"];
  addItem: (item: Record<string, any>) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}
