import axios from "axios";
import { Project } from "../types/project.type";



export const getAllProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get("/api/projects");
  return data.data;
};
