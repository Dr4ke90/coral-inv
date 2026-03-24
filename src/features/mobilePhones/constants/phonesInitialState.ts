import { MobilePhone } from "../types/phones.type";

export const PHONES_INITIAL_STATE: Partial<MobilePhone> = {
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
