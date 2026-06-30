import * as projectRepository from "@/repository/projectRepo";
import * as equipRepository from "@/repository/equipmentRepo";
import * as requirementRepository from "@/repository/requirementRepo";
import * as employeeRepository from "@/repository/employeeRepo";

export async function readAllProjects() {
  const [projects, equipment, requirements, employees] = await Promise.all([
    projectRepository.getAllProjects(),
    equipRepository.getAllEquipment(),
    requirementRepository.getAllRequirements(),
    employeeRepository.getAllEmployees(),
  ]);

  const projectsWithCounts = projects.map((project) => {
    const projectEquipmentCount = equipment.filter(
      (e: any) => e.projectId === project.id,
    ).length;

    const projectRequirementsCount = requirements.filter(
      (r: any) => r.projectId === project.id,
    ).length;

    const projectTeam = employees
      .filter((e: any) => e.projects?.includes(project.id) && e.id !== "E0000")
      .slice(0, 3)
      .map((e: any) => e.name);

    return {
      ...project,
      eqNo: projectEquipmentCount,
      necesarCount: projectRequirementsCount,
      teamMembers: projectTeam,
    };
  });

  return projectsWithCounts;
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
