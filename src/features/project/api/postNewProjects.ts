import axios from "axios";
import { Project } from "../types/project.type";


export const postNewProject = async (
  payload: Partial<Project>,
): Promise<Project> => {
  const { data } = await axios.post("/api/projects", payload);
  return data.data;
};
