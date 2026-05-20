import axios from "axios";

export const logoutUser = async () => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_LOGOUT}`);
};
