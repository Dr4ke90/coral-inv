export interface MobilePhone {
  id: string;
  model: string;
  config: string;
  series: string;
  imei: string;
  price: number | string;
  status: string;
  refInvoice: Record<string, any>;
  requirementId: string;
  createdBy: string;
  createdAt: Date | null;
  pvList: string[];
}
