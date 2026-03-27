export interface ComponentType {
  id: string;
  series: string;
  price: number | string;
  status: string;
  refInvoice: Record<string, any>;
  requirementId: string;
  eqId: string;
  pvId: string;
  addedBy: string;
  addedAt: Date | null;
}
