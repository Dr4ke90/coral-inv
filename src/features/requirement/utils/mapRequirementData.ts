import { Employee } from "@/features/employees/types/employee.type";
import { Project } from "@/features/projects/types/project.type";
import { Requirement } from "../types/requiment.type";

export const mapRequirementDataForDocx = (
  data: Requirement,
  employees: Employee[],
  projects: Project[],
) => {
  const dateObj = new Date(data.date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const createdBy =
    employees?.find((e: Employee) => e.id === data.createdBy)?.name ||
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
