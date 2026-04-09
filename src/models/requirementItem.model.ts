import { Schema } from "mongoose";

const requirementItemSchema = new Schema({
  item: { type: String, required: true },
  quantity: { type: String, required: true },
  um: { type: String, required: true },
  unitPrice: { type: String, required: true },
  currency: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

export default requirementItemSchema;
