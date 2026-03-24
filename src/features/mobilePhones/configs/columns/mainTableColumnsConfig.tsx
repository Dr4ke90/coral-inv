"use client";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";
import { MRT_ColumnDef } from "material-react-table";
import { MobilePhone } from "../../types/phones.type";
import Link from "next/link";
import { Box } from "@mui/material";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<MobilePhone>[] => {
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
      accessorKey: "model",
      header: "Model",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "config",
      header: "Config",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "imei",
      header: "IMEI",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "series",
      header: "Serie",
      enableEditing: true,
      size: 200,
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
        if (id === "E0000")
          return <Box>{employees?.find((p) => p.id === id)?.name}</Box>;
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
      accessorFn: (row) => `${row?.refInvoice?.sn}`,
      header: "S/N Fact.",
      enableEditing: false,
      size: 120,
      minSize: 50,
    },
    {
      accessorKey: "requirementId",
      header: "Necesar",
      enableEditing: false,
      size: 30,
      minSize: 30,
      Cell: ({ cell }) => {
        const id = cell.getValue<string>();
        return <Link href={`/requirements/${id?.toLowerCase()}`}>{id}</Link>;
      },
    },
  ];
};
