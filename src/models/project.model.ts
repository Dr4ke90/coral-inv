import { Schema, models, model } from "mongoose";

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

const ProjectModel = models.Project || model("Project", projectSchema);

export default ProjectModel;
