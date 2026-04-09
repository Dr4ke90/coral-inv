import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";
import componentItemSchema from "./componentItem.schema";

const componentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
  config: { type: String, required: false },
  lastEntry: { type: Date, required: true },
  items: { type: [componentItemSchema], required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, require: true },
  logs: { type: [logSchema], default: [] },
  observations: { type: [Object], default: {} },
});

if (models.component) {
  delete models.component;
}

const InternalComponentModel =
  models["component"] || model("component", componentSchema);

export default InternalComponentModel;
