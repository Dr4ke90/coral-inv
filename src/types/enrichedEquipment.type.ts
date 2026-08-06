import { EquipmentType } from "./equipment.type";

export interface EnrichedEquipmentType extends EquipmentType {
  custodianName: string;
  creatorName: string;
  projectName: string;
  refInvoiceOptions: string[];
}
