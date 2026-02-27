import { Requirement } from "@/features/requirement/types/requirementInterface";
import axios from "axios";

export const requirementService = {
  async getAllData(): Promise<Requirement[]> {
    const { data } = await axios.get("/api/requirement");
    return data.data;
  },

  async getRequirmentSheetById(id: string): Promise<Requirement> {
    const { data } = await axios.get(`/api/requirement/${id}`);
    return data.data;
  },

  async postOneRequirementSheet(
    payload: Partial<Requirement>,
  ): Promise<Requirement> {
    const { data } = await axios.post("/api/requirement", payload);
    return data.data;
  },

  async putRequirementSheet(
    id: string,
    payload: Partial<Requirement>,
  ): Promise<Requirement> {
    const { data } = await axios.put(`/api/requirement/${id}`, payload);
    return data.data;
  },

  async deleteRequirement(id: string): Promise<void> {
    await axios.delete(`/api/requirement/${id}`);
  },
};
