import { MobilePhone } from "../types/phones.type";

export const PHONES_INITIAL_STATE: Partial<MobilePhone> = {
  id: "",
  brand: "",
  model: "",
  config: "",
  imei: "",
  series: "",
  price: "",
  requirementId: "",
  custodianId: "",
  refInvoice: {
    sn: "",
    date: "",
  },
};
