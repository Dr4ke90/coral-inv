import { Schema, models, model } from "mongoose";
import logSchema from "./log.model";

const projectSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    owner: { type: String, default: "" },
    team: { type: Array, default: [] },
    status: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    logs: { type: [logSchema], default: [] },
  },
  { toJSON: { getters: true } },
);

const ProjectModel = models.Project || model("Project", projectSchema);

export default ProjectModel;
