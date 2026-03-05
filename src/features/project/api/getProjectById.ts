import axios from "axios";
import { ProjectType } from "../types/project.type";


export const getProjectById = async (
  id: string,
): Promise<ProjectType> => {
  const { data } = await axios.get(`/api/projects/${id}`);
  return data.data;
};
