import axios from "axios";
import { User } from "../types/user.type";

export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_CURRENT_USER}`,
  );
  return data.data;
};
