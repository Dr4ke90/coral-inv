import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";

const entrySchema = new Schema({
  type: { type: String, default: "" },
  id: { type: String, required: true, unique: true },
  sn: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  vendor: { type: String, default: "" },
  total: { type: Number, default: 0 },
  items: { type: [String], default: [] },
  requirementId: { type: String, default: "" },
  filePreview: { type: Boolean, default: false },
  createdBy: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  notes: { type: [Object], default: [] },
  logs: { type: [logSchema], default: [] },
});

const EntryModel = models.entry || model("entry", entrySchema);

export default EntryModel;
