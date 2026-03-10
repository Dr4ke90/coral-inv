import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export interface ItemsListContextProps {
  eqList: HandoverSheet["eqList"]; // (sau HandoverSheet["eqList"] dacă este array de string-uri)
  previewList: EquipmentType[];
  addItem: (item: EquipmentType) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}

