import { Employee } from "@/features/employees/types/employee.type";
import { Equipment } from "@/features/equipment-it/types/equipment.type";
import { Project } from "@/features/projects/types/project.type";
import { HandoverSheet } from "@/types/handoverSheet.type";

export const mapReturnDataForDocx = (
  data: HandoverSheet,
  employees: Employee[],
  projects: Project[],
  equipments: Equipment[],
) => {
  const dateObj = new Date(data.date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const handoverPersonName =
    employees?.find((e: Employee) => e.id === data.handoverPersonId)?.name ||
    data.handoverPersonId;

  const recipientPersonName =
    employees?.find((e: Employee) => e.id === data.recipientPersonId)?.name ||
    data.recipientPersonId;

  const projectName =
    projects?.find((p) => p.id === data.projectId)?.name || data.projectId;

  const mappedEquipments = equipments?.filter((e) =>
    data.eqList.includes(e.id),
  );

  return {
    id: data.id,
    date: formattedDate,
    handoverPerson: handoverPersonName,
    recipientPerson: recipientPersonName,
    project: projectName,
    equipment: mappedEquipments,
  };
};
