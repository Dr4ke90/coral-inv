"use client";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";
import { MRT_ColumnDef } from "material-react-table";
import { Equipment } from "../../types/equipment.type";
import Link from "next/link";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<Equipment>[] => {
  const { data: employees } = useEmployees();
  const { data: projects } = useProjects();

  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 30,
      minSize: 30,
      maxSize: 30,
      enableEditing: false,
    },
    {
      accessorKey: "type",
      header: "Tip",
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "model",
      header: "Model",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "config",
      header: "Config",
      enableEditing: true,
      size: 300,
    },
    {
      accessorKey: "series",
      header: "Serie",
      enableEditing: true,
      size: 130,
    },
    {
      accessorKey: "status",
      header: "Stare",
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: "custodianId",
      header: "Responsabil",
      enableEditing: false,
      size: 200,
      Cell: ({ cell }) => {
        const id = cell.getValue<string>();
        if (id === "E0000") return;
        return (
          <Link href={`/employees/${id.toLowerCase()}`}>
            {employees?.find((p) => p.id === id)?.name}
          </Link>
        );
      },
    },
    {
      accessorKey: "projectId",
      header: "Proiect",
      enableEditing: false,
      size: 200,
      Cell: ({ cell }) => {
        const id = cell.getValue<string>();
        return (
          <Link href={`/projects/${id.toLowerCase()}`}>
            {projects?.find((p) => p.id === id)?.name}
          </Link>
        );
      },
    },
    {
      accessorKey: "invoice",
      header: "S/N Fact.",
      enableEditing: false,
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "requirmentId",
      header: "Necesar",
      enableEditing: false,
      size: 30,
      minSize: 30,
      Cell: ({ cell }) => {
        const pvList = cell.getValue<string[]>();
        return Array.isArray(pvList) ? pvList.length : 0;
      },
    },
  ];
};
