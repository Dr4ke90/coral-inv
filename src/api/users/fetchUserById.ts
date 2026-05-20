import axios from "axios";
import { User } from "@/types/user.type";

export const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_USERS}/${id}`,
  );
  return data.data;
};
