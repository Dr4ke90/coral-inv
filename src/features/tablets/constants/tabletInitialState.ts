import { Tablet } from "../types/tablet.type";

export const TABLET_INITIAL_STATE: Partial<Tablet> = {
  id: "",
  model: "",
  config: "",
  imei: "",
  series: "",
  price: "",
  requirementId: "",
  refInvoice: {
    sn: "",
    date: "",
  },
};
