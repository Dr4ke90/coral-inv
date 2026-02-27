"use client";
import { Project } from "@/features/project/types/projectInterface";
import { MRT_ColumnDef } from "material-react-table";

export const mainProjectColumnsConfig: MRT_ColumnDef<Project>[] = [
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
    header: "Email",
    enableEditing: true,
    size: 250,
  },
  {
    accessorKey: "owner",
    header: "Telefon",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "team",
    header: "Functie",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "refEquipmentList",
    header: "Functie",
    enableEditing: true,
    size: 200,
  },
];
