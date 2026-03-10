import axios from "axios";
import { Project } from "../types/project.type";

export const updateProject = async (
  id: string,
  payload: Partial<Project>,
): Promise<Project> => {
  const { data } = await axios.put(`/api/projects/${id}`, payload);
  return data.data;
};
