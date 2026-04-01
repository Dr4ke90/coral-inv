export interface Equipment {
  id: string;
  type: string;
  model: string;
  config: string;
  series: string;
  price: number | string;
  status: string;
  refInvoice: Record<string, any>;
  requirementId: string;
  createdBy: string;
  createdAt: Date | null;
  pvRef: string[];
}
