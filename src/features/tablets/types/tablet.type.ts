export interface Tablet {
  id: string;
  brand: string;
  model: string;
  config: string;
  series: string;
  imei: string;
  price: number | string;
  status: string;
  refInvoice: string;
  requirementId: string;
  createdBy: string;
  createdAt: Date | null;
  pvList: string[];
  projectId: string;
  custodianId: string;
}
