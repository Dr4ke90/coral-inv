import { EmployeeType } from "@/types/employee.type";
import { ProjectType } from "@/types/project.type";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { User } from "@/types/user.type";

export const mapHandoverDataForDocx = (
  data?: HandoverSheet,
  employees?: EmployeeType[],
  projects?: ProjectType[],
  equipments?: any[],
  users?: User[],
) => {
  const dateObj = new Date(data!.date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const handoverPersonName =
    users?.find((u: User) => u.id === data!.handoverPersonId)?.name ||
    data!.handoverPersonId;

  const recipientPersonName =
    employees?.find((e: EmployeeType) => e.id === data!.recipientPersonId)
      ?.name || data!.recipientPersonId;

  const projectName =
    projects?.find((p) => p.id === data!.projectId)?.name || data!.projectId;

  const mappedEquipments = equipments?.filter((e) =>
    data!.eqList.includes(e.id),
  );

  return {
    id: data!.id,
    date: formattedDate,
    handoverPerson: handoverPersonName,
    recipientPerson: recipientPersonName,
    project: projectName,
    equipment: mappedEquipments,
  };
};
