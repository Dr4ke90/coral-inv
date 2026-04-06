import { Project } from "@/features/projects/types/project.type";
import { useRequirementData } from "@/features/requirement";
import { MRT_ColumnDef } from "material-react-table";
import { useEquipment } from "@/hooks/useEquipment";
import { useEmployees } from "@/hooks/useEmployees";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<Project>[] => {
  const { data: requirements } = useRequirementData();
  const { data: equipment } = useEquipment();
  const { data: employees } = useEmployees();

  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 30,
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Nume",
      size: 200,
      enableEditing: true,
    },
    {
      accessorKey: "address",
      header: "Adresa",
      enableEditing: true,
      size: 250,
    },
    {
      accessorKey: "owner",
      header: "Proprietar",
      enableEditing: true,
      size: 200,
    },
    {
      id: "teamMembers",
      header: "Echipa",
      enableEditing: false,
      size: 250,
      Cell: ({ row }) => {
        const team = employees?.filter(
          (e: any) => e.project === row.original.id && e.id !== "E0000",
        );

        if (!team || team.length === 0) return "-";

        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {team.map((e: any) => (
              <span key={e.id}>{e.name}</span>
            ))}
          </div>
        );
      },
    },
    {
      id: "eqNr",
      header: "Echipament",
      enableEditing: false,
      size: 200,
      Cell: ({ row }) => {
        const eqList = equipment?.filter(
          (e: any) => e.projectId === row.original.id,
        );

        return eqList ? eqList.length : 0;
      },
    },
    {
      id: "necesarCount",
      header: "Necesar",
      enableEditing: false,
      size: 200,
      Cell: ({ row }) => {
        const reqList = requirements?.filter(
          (r: any) => r.projectId === row.original.id,
        );

        return reqList ? reqList.length : 0;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableEditing: true,
      size: 200,
    },
  ];
};
