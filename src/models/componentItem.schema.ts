import { Schema } from "mongoose";
import logSchema from "./log.model";

const componentItemSchema = new Schema(
  {
    id: { type: String, required: true },
    series: { type: String, default: "" },
    price: { type: Number, required: true },
    refInvoice: { type: String, required: true },
    eqId: { type: String, default: "" },
    pvId: { type: String, default: "" },
    requirementId: { type: String, default: "" },
    addedBy: { type: String, required: true },
    addedAt: { type: Date, require: true },
    observations: { type: [Object], default: {} },
    logs: { type: [logSchema], default: [] },
  },
  { _id: false },
);

export default componentItemSchema;
