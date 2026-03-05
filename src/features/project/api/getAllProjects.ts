import axios from "axios";
import { ProjectType } from "../types/project.type";



export const getAllProjects = async (): Promise<ProjectType[]> => {
  const { data } = await axios.get("/api/projects");
  return data.data;
};
