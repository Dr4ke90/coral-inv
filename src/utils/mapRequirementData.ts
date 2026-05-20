import { Requirement } from "../types/requiment.type";
import { ProjectType } from "@/types/project.type";
import { User } from "@/types/user.type";

export const mapRequirementDataForDocx = (
  data: Requirement,
  users: User[],
  projects: ProjectType[],
) => {
  const dateObj = new Date(data.date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const createdBy =
    users?.find((user: User) => user.id === data.createdBy)?.name ||
    data.createdBy;

  const projectName =
    projects?.find((p) => p.id === data.projectId)?.name || data.projectId;

  return {
    ...data,
    date: formattedDate,
    createdBy: createdBy,
    project: projectName,
  };
};
