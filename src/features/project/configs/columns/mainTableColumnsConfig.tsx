import { ProjectType } from "@/features/project/types/project.type";
import { MRT_ColumnDef } from "material-react-table";

export const mainTableColumnsConfig: MRT_ColumnDef<ProjectType>[] = [
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
    accessorKey: "eqList",
    header: "Echipament",
    enableEditing: false,
    size: 200,
  },
];
