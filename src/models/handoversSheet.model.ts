import { Schema, models, model } from "mongoose";

const modificationSchema = new Schema(
  {
    name: { type: String, required: true },
    modifiedFields: { type: Object, required: true },
    modifiedAt: { type: Date, required: true },
  },
  { _id: false },
);

const handoverSheetSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    projectId: { type: String, required: true },
    handoverPersonId: { type: String, required: true },
    recipientPersonId: { type: String, required: true },
    eqList: { type: [String], required: true },
    modifiedBy: { type: [modificationSchema], default: [] },
    filePreview: { type: Boolean, default: false },
    notes: { type: [Object], default: [] },
  },
  { versionKey: false },
);

if (models.HandoverSheet) {
  delete models.HandoverSheet;
}

const HandoverSheetModel =
  models.HandoverSheet || model("HandoverSheet", handoverSheetSchema);

export default HandoverSheetModel;
