import { Schema, models, model } from "mongoose";

const modificationSchema = new Schema(
  {
    name: { type: String, required: true },
    modifiedFields: { type: Object, required: true },
    modifiedAt: { type: Date, required: true },
  },
  { _id: false },
);

const invoiceSchema = new Schema(
  {
    sn: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    vendor: { type: String, required: true },
    total: { type: Number, default: 0 },
    eqList: { type: [String], required: true },
    modifiedBy: { type: [modificationSchema], default: [] },
    filePreview: { type: Boolean, default: false },
    notes: { type: [Object], default: [] },
  },
  { versionKey: false },
);

if (models.Invoices) {
  delete models.Invoices;
}

const InvoiceModel = models.Invoice || model("Invoice", invoiceSchema);

export default InvoiceModel;
