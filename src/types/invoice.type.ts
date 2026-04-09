export interface InvoiceType {
  date: Date | string;
  sn: string;
  vendor: string;
  total: number;
  preview: boolean;
}
