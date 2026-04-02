import { Project } from "@/features/projects/types/project.type";
import { useRequirementData } from "@/features/requirement";
import { MRT_ColumnDef } from "material-react-table";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<Project>[] => {
  const { data: requirements } = useRequirementData();

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
      accessorKey: "team",
      header: "Echipa",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "eqList.length",
      header: "Echipament",
      enableEditing: false,
      size: 200,
    },
    {
      accessorFn: (row) => requirements?.filter((r) => r.projectId === row.id).length,
      header: "Necesar",
      enableEditing: false,
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableEditing: false,
      size: 200,
    },
  ];
};
