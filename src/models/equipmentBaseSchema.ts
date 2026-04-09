import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";

const equipmentBaseSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    type: { type: String, required: true },
    model: { type: String, required: true },
    config: { type: String, required: true },
    series: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Nou" },
    refInvoice: { type: Object, default: {} },
    requirementId: { type: String, default: "" },
    observations: { type: [Object], default: [] },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    logs: { type: [logSchema], default: [] },
    pvRef: { type: [String], default: [] },
    inventoryDate: { type: Date, default: Date.now },
    custodianId: { type: String, default: "E0000" },
    projectId: { type: String, default: "PJ0001" },
  },
  { discriminatorKey: "type", collection: "it-equipment" },
);

const EquipmentModel =
  models["it-equipment"] || model("it-equipment", equipmentBaseSchema);

export default EquipmentModel;
