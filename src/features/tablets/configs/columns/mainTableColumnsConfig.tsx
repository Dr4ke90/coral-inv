"use client";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";
import { MRT_ColumnDef } from "material-react-table";
import { Tablet } from "../../types/tablet.type";
import Link from "next/link";
import { Box } from "@mui/material";
import SingleSelect from "@/components/ui/SingleSelect";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<Tablet>[] => {
  const { data: employees } = useEmployees();
  const { data: projects } = useProjects();

  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 30,
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
      size: 200,
      enableEditing: (row) => {
        const custodianId = row.original.custodianId;
        if (custodianId === "E0000") {
          return true;
        }
        return false;
      },

      Edit: ({ cell, row, column }) => {
        const projectIds = cell.getValue<string[]>() || [];
        const defaultValue =
          projects?.filter((p: any) => projectIds.includes(p.id)) || [];

        return (
          <SingleSelect
            name={column.id}
            options={projects!.filter(
              (p: any) => p.id === "PJ0001" || p.id === "PJ0002",
            )}
            value={defaultValue[0]}
            placeholder="Proiect"
            onChange={(_, value) => {
              const newValue = value?.id || "";

              row._valuesCache[column.id] = newValue;
            }}
          />
        );
      },

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
      accessorKey: "refInvoice",
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
