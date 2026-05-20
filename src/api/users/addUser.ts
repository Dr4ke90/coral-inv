import axios from "axios";
import { User } from "@/types/user.type";

export const addUser = async (
  payload: Partial<User>,
): Promise<User> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_USERS}`,
    payload,
  );
  return data.data;
};
