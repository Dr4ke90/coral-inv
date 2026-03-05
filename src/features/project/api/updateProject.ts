import axios from "axios";
import { ProjectType } from "../types/project.type";


export const updateProject = async (
  id: string,
  payload: Partial<ProjectType>,
): Promise<ProjectType> => {
  const { data } = await axios.put(`/api/projects/${id}`, payload);
  return data.data;
};
