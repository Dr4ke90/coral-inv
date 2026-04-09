import * as usersRepository from "@/repository/usersRepo";

export async function readAllUsers() {
  return await usersRepository.getAllUsers();
}

export async function readUserById(id: string) {
  return await usersRepository.getUserById(id)
}

export async function addUser(data: any) {
  return await usersRepository.createUser(data);
}

export async function updateUser(id: string, data: any) {
  return await usersRepository.updateUser(id, data);
}

export async function loginUser(username: string, password: string) {
  return await usersRepository.findUserForLogin(username, password);
}
