import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";

const employeeSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    telNo: { type: String, default: "" },
    position: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    projects: { type: [String], default: [] },
    status: { type: String, default: "" },
    logs: { type: [logSchema], default: [] },
  },
  { versionKey: false },
);

const EmployeeModel = models.Employee || model("Employee", employeeSchema);

export default EmployeeModel;
