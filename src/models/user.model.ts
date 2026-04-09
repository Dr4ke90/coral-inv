import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { collection: "users", timeStamp: true },
);

const User = models.user || model("user", userSchema);

export default User;
