export interface Equipment {
  id: string;
  type: string;
  model: string;
  config: string;
  series: string;
  price: number | string;
  status: string;
  invoice: string;
  requirementId: string;
  createdBy: string;
  pvList: string[];
}
