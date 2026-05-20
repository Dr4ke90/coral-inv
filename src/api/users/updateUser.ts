import axios from "axios";
import { User } from "@/types/user.type";

export const updateUser = async (
  id: string,
  payload: Partial<User>,
): Promise<User> => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_USERS}/${id}`,
    payload,
  );
  return data.data;
};
