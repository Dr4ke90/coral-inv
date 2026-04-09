export interface ComponentType {
  id: string;
  series: string;
  price: number | string;
  status: string;
  refInvoice: string;
  requirementId: string;
  eqId: string;
  pvId: string;
  addedBy: string;
  addedAt: Date | null;
}
