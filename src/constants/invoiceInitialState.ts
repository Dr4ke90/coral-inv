import { InvoiceType } from "@/types/invoice.type";

export const INVOICE_INITIAL_STATE: InvoiceType = {
  date: "",
  sn: "",
  vendor: "",
  preview: false,
  total: 0,
};
