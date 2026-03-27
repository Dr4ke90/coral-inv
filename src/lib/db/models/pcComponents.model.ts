import { Schema, models, model } from "mongoose";

const componentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
  lastEntry: { type: Date, required: true },
  items: {
    type: [
      {
        id: { type: String, required: true },
        series: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        refInvoice: { type: String, required: true },
        eqId: { type: String, default: "" },
        pvRef: { type: String, default: "" },
        status: { type: String, default: "" },
        addedBy: { type: String, required: true },
        addedAt: { type: Date, require: true },
        observations: { type: [Object], default: {} },
        modifiedBy: [
          {
            name: { type: String, default: "" },
            modifiedFields: { type: [Object], default: [] },
            modifiedAt: { type: Date, default: "" },
          },
        ],
      },
      { _id: false },
    ],
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, require: true },
  observations: { type: [Object], default: {} },
});

if (models.component) {
  delete models.component;
}

const InternalComponentModel =
  models["component"] || model("component", componentSchema);

module.exports = InternalComponentModel;
