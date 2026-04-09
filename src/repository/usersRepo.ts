import { User } from "@/features/users/types/user.type";
import UserModel from "@/models/user.model";
import { ClientSession } from "mongoose";

export async function getAllUsers() {
  return await UserModel.find({}).select("-password");
}

export async function getUserById(id: string) {
  return await UserModel.findById(id).select("-password");
}

export async function findUserForLogin(username: string, password: string) {
  return await UserModel.findOne({ username, password });
}

export async function createUser(data: User, session?: ClientSession) {
  return await UserModel.create([data], { session });
}

export async function updateUser(id: string, data: any) {
  return await UserModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}
