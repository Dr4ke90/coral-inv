import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";

const tabletSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  model: { type: String, required: true },
  config: { type: String, required: true },
  series: { type: String, required: true, unique: true },
  imei: { type: String, required: true, unique: true },
  simNo: { type: String, default: "" },
  simSn: { type: String, default: "" },
  price: { type: Number, required: true },
  status: { type: String, default: "Nou" },
  refInvoice: { type: Object, default: {} },
  requirementId: { type: String, default: "" },
  observations: { type: [Object], default: {} },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  logs: { type: [logSchema], default: [] },
  pvRef: { type: [String], default: [] },
  inventoryDate: { type: Date, default: Date.now },
  custodianId: { type: String, default: "E0000" },
  projectId: { type: String, default: "PJ0002" },
});

if (models.Tablet) {
  delete models.Tablet;
}

const TabletModel = models["Tablet"] || model("Tablet", tabletSchema);

export default TabletModel;
