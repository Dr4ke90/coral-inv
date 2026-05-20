import * as usersRepository from "@/repository/usersRepo";
import bcrypt from "bcrypt";

export async function readAllUsers() {
  return await usersRepository.getAllUsers();
}

export async function readUserById(id: string) {
  return await usersRepository.getUserById(id);
}

export async function addUser(data: any) {
  return await usersRepository.createUser(data);
}

export async function updateUser(id: string, data: any) {
  const user = await usersRepository.getUserById(id);
  if (!user) return null;

  Object.assign(user, data);

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
}

export async function loginUser(username: string, password: string) {
  const user = await usersRepository.getUserByUsername(username);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
}
