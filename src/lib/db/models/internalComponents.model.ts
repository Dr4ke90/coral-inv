import { Schema, models, model } from "mongoose";

const componentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
  config: { type: String, required: false },
  lastEntry: { type: Date, required: true },
  items: {
    type: [
      {
        id: { type: String, required: true },
        series: { type: String, default: "" },
        price: { type: Number, required: true },
        refInvoice: {
          type: {
            sn: { type: String, required: true },
            date: { type: Date, required: false },
            vendor: { type: String, required: false },
            preview: { type: Boolean, default: false },
          },
          required: true,
        },
        eqId: { type: String, default: "" },
        pvId: { type: String, default: "" },
        requirementId: { type: String, default: "" },
        addedBy: { type: String, required: true },
        addedAt: { type: Date, require: true },
        observations: { type: [Object], default: {} },
      },
      { _id: false },
    ],
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, require: true },
  modifiedBy: [
    {
      name: { type: String, default: "" },
      modifiedFields: { type: [Object], default: [] },
      modifiedAt: { type: Date, default: "" },
    },
  ],
  observations: { type: [Object], default: {} },
});

if (models.component) {
  delete models.component;
}

const InternalComponentModel =
  models["component"] || model("component", componentSchema);

export default InternalComponentModel;
