import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";

const returnSheetSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    projectId: { type: String, required: true },
    handoverPersonId: { type: String, required: true },
    recipientPersonId: { type: String, required: true },
    eqList: { type: [String], required: true },
    logs: { type: [logSchema], default: [] },
    filePreview: { type: Boolean, default: false },
    notes: { type: [Object], default: [] },
  },
  { versionKey: false },
);

if (models.ReturnSheet) {
  delete models.ReturnSheet;
}

const ReturnSheetModel =
  models.ReturnSheet || model("ReturnSheet", returnSheetSchema);

export default ReturnSheetModel;
