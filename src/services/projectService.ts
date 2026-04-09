import * as projectRepository from "@/repository/projectRepo";

export async function readAllProjects() {
  return await projectRepository.getAllProjects();
}

export async function readProjectById(id: string) {
  return await projectRepository.getProjectById(id);
}

export async function addProject(data: any) {
  return await projectRepository.createProject(data);
}

export async function updateProject(id: string, data: any) {
  return await projectRepository.updateProjectById(id, data);
}
