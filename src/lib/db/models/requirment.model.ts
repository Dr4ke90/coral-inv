import { Schema, models, model } from "mongoose";

const requirementSheetSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    items: {
      type: [
        {
          item: { type: String, required: true },
          quantity: { type: String, required: true },
          um: { type: String, required: true },
          unitPrice: { type: String, required: true },
          currency: { type: String, required: true },
          totalPrice: { type: Number, required: true },
        },
      ],
      required: true,
    },
    project: { type: String, required: true },
    totalCollectedPrice: { type: Number, required: true },
    status: { type: String, required: true },
    filePreview: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    modifiedBy: {
      type: [
        new Schema(
          {
            name: { type: String, required: true },
            modifiedFields: { type: Object, required: true },
            modifiedAt: { type: String, required: true },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
  },
  { toJSON: { getters: true } },
);

if (process.env.NODE_ENV === "development") {
  delete models.RequirementSheet;
}

const RequirementSheetModel =
  models.RequirementSheet || model("RequirementSheet", requirementSheetSchema);

export default RequirementSheetModel;
