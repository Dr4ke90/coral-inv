import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";
import requirementItemSchema from "./requirementItem.model";

const requirementSheetSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    items: { type: [requirementItemSchema], required: true },
    projectId: { type: String, required: true },
    totalCollectedPrice: { type: Number, required: true },
    status: { type: String, required: true },
    filePreview: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    logs: { type: [logSchema], default: [] },
  },
  { toJSON: { getters: true } },
);

if (process.env.NODE_ENV === "development") {
  delete models.RequirementSheet;
}

const RequirementSheetModel =
  models.RequirementSheet || model("RequirementSheet", requirementSheetSchema);

export default RequirementSheetModel;
