import { Schema, models, model } from "mongoose";

const modificationSchema = new Schema(
  {
    name: { type: String, required: true },
    modifiedFields: { type: Object, required: true },
    modifiedAt: { type: Date, required: true },
  },
  { _id: false },
);

const baseSchema = new Schema(
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
    observations: { type: [Object], default: {} },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedBy: { type: [modificationSchema], default: [] },
    pvRef: { type: [String], default: [] },
    archive: { type: [Object], default: [] },
    inventoryDate: { type: Date, default: Date.now },
    custodianId: { type: String, default: "E0000" },
    projectId: { type: String, default: "PJ0001" },
  },
  { discriminatorKey: "type", collection: "it-equipment" },
);

const EquipmentModel =
  models["it-equipment"] || model("it-equipment", baseSchema);

export default EquipmentModel;
