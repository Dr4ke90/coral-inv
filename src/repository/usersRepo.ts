import { User } from "@/types/user.type";
import UserModel from "@/models/user.model";
import { ClientSession } from "mongoose";

export async function getAllUsers() {
  return await UserModel.find({}).select("-password");
}

export async function getUserById(id: string) {
  return await UserModel.findOne({ id }).select("-password");
}

export async function getUserByUsername(username: string) {
  return await UserModel.findOne({ username });
}

export async function createUser(data: User, session?: ClientSession) {
  const result = await UserModel.create([data], { session });
  return result[0];
}

export async function updateUser(id: string, data: any) {
  return await UserModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
    projection: "-password",
  });
}
