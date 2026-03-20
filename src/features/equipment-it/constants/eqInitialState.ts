import { Equipment } from "../types/equipment.type";

export const EQ_INITIAL_STATE: Partial<Equipment> = {
  id: "",
  type: "",
  model: "",
  config: "",
  series: "",
  price: "",
  requirementId: "",
  refInvoice: {
    sn: "",
    date: ""
  },
};
