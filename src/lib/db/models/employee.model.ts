import { Schema, models, model } from "mongoose";

const modificationSchema = new Schema(
  {
    name: { type: String, required: true },
    modifiedFields: { type: Object, required: true },
    modifiedAt: { type: Date, required: true },
  },
  { _id: false },
);

const employeeSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    telNo: { type: String, default: "" },
    position: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    project: { type: String, default: "" },
    pv: { type: [String], default: [] },
    eqList: { type: [String], default: [] },
    status: { type: String, default: "" },
    modifiedBy: { type: [modificationSchema], default: [] },
  },
  { versionKey: false },
);

const EmployeeModel = models.Employee || model("Employee", employeeSchema);

export default EmployeeModel;
