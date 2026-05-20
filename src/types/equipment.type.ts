export interface EquipmentType {
  id: string;
  type: string;
  category: string;
  brand: string;
  model: string;
  config: string;
  series: string;
  price: number;
  status: string;
  entryId: string;
  requirementId: string;
  createdBy: string;
  createdAt: Date | null;
  pvRef: string[];
  custodianId?: string;
  projectId?: string;
}
