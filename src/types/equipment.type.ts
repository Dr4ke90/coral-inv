export interface EquipmentType {
  _id?: string;

  id: string;
  type: string;
  category: string;

  brand?: string;
  model: string;
  config: string;
  series: string;

  price: number | null;
  status: string;

  entryId?: string;
  requirementId?: string;
  refInvoice?: string;

  createdBy: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  pvRef: string[];

  custodianId?: string;
  projectId?: string;

  notes: string;
  logs: Record<string, unknown>[];
}
