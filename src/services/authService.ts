import axios from "axios";
import { LoginData } from "@/types/users/loginData";

export const authService = {
  async getCurrentUser() {
    const { data } = await axios.get("/api/me");
    return data.data;
  },

  async login(credentials: LoginData) {
    const { data } = await axios.post("/api/login", credentials);
    if (!data.success) throw new Error(data.error);
    return data.data;
  },

  async logout() {
    await axios.post("/api/logout");
  },
};
