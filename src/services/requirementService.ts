import * as requirementRepository from "@/repository/requirementRepo";
import * as projectsRepo from "@/repository/projectRepo";
import * as usersRepo from "@/repository/usersRepo";
import { Requirement } from "@/types/requiment.type";
import fs from "fs/promises";
import path from "path";

export async function readAllRequirements() {
  const [requirements, users, projects] = await Promise.all([
    requirementRepository.getAllRequirements(),
    usersRepo.getAllUsers(),
    projectsRepo.getAllProjects(),
  ]);

  const usersMap = new Map();
  users.forEach((user) => usersMap.set(user.id, user.name));

  const projectMap = new Map();
  projects.forEach((proj) => projectMap.set(proj.id, proj.name));

  const enrichedPromises = requirements.map(async (rq) => {
    const dateObj = new Date(rq.date);
    const year = dateObj.getFullYear();

    const relativePath = `public/uploads/necesar/${year}/${rq.id}.pdf`;
    const absolutePath = path.resolve(relativePath);

    let pdfPreview = false;
    let pdfPath = null;

    try {
      await fs.access(absolutePath);
      pdfPreview = true;
      pdfPath = `uploads/necesar/${year}/${rq.id}.pdf`;
    } catch {
      console.log(`${rq.id} nu exista`);
    }

    return {
      ...rq,
      userName: usersMap.get(rq.createdBy) || "-",
      projectName: projectMap.get(rq.projectId) || "-",
      itemsLength: rq.items?.length ?? 0,
      pdfPreview,
      pdfPath,
    };
  });

  return await Promise.all(enrichedPromises);
}

export async function readRequirementById(id: string) {
  return await requirementRepository.getRequirementById(id);
}

export async function addRequirement(data: any) {
  return await requirementRepository.createRequirement(data);
}

export async function updateRequirement(
  id: string,
  payload: Partial<Requirement>,
) {
  console.log("PAYLOAD", payload);

  return await requirementRepository.updateRequirementById(id, payload);
}
