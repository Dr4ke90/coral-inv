import axios from "axios";
import { ProjectType } from "../types/project.type";


export const postNewProject = async (
  payload: Partial<ProjectType>,
): Promise<ProjectType> => {
  const { data } = await axios.post("/api/projects", payload);
  return data.data;
};
