export interface ItemsListContextProps {
  previewList: EquipmentType[];
  addItem: (item: EquipmentType) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}
