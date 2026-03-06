import axios from "axios";
import { Project } from "../types/project.type";


export const getProjectById = async (
  id: string,
): Promise<Project> => {
  const { data } = await axios.get(`/api/projects/${id}`);
  return data.data;
};
