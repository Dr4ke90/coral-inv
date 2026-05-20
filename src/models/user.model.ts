import { Schema, models, model } from "mongoose";
import bcrypt from "bcrypt";
import logSchema from "./log.model";

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    permissions: { type: [Object], default: [] },
    createdBy: { type: String, required: true },
    logs: { type: [logSchema], default: [] },
    notes: { type: [Object], default: [] },
  },
  { collection: "users", timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

if (process.env.NODE_ENV !== "production" && models.user) {
  delete models.user;
}

const User = models.user || model("user", userSchema);

export default User;
