import axios from "axios";
import { LoginData } from "../types/loginData";

export const loginUser = async (credentials: LoginData) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_LOGIN}`,
    credentials,
  );
  if (!data.success) throw new Error(data.error);
  return data.data;
};
