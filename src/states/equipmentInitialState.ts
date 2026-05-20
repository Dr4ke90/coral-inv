import { EquipmentType } from "@/types/equipment.type";

export const EQUIPMENT_INITIAL_STATE: Partial<EquipmentType> = {
  id: "",
  type: "",
  brand: "",
  category: "",
  model: "",
  config: "",
  series: "",
  price: 0,
  requirementId: "",
  refInvoice: "",
};
