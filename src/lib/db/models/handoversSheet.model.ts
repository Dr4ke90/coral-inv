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
    project: { type: String, required: true },
    handoverPerson: { type: String, required: true },
    recipientPerson: { type: String, required: true },
    refEquipmentList: { type: [String], default: [] },
    modifiedBy: { type: [modificationSchema], default: [] },
    filePreview: { type: Boolean, default: false },
  },
  { versionKey: false },
);

const HandoverSheetModel =
  models.HandoverSheetModel || model("HandoverSheet", handoverSheetSchema);

export default HandoverSheetModel;
