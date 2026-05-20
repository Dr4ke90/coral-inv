import { Schema } from "mongoose";

const requirementItemSchema = new Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  um: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  logs: { type: [Object], default: [] },
});

export default requirementItemSchema;
