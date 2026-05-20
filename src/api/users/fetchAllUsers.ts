import axios from "axios";
import { User } from "@/types/user.type";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_USERS}`);
  return data.data;
};
