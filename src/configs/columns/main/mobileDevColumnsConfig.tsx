"use client";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useProjects } from "@/hooks/projects/useProjects";
import { MRT_ColumnDef } from "material-react-table";
import Link from "next/link";
import { Box } from "@mui/material";
import SingleSelect from "@/components/ui/SingleSelect";
import { useMemo } from "react";
import { MobileDevicesType } from "@/types/mobileDevices.type";

export const useMainMobileDevColumnsConfig =
  (): MRT_ColumnDef<MobileDevicesType>[] => {
    const { data: employees } = useEmployees();
    const { data: projects } = useProjects();

    return useMemo(
      () => [
        {
          accessorKey: "id",
          header: "ID",
          size: 30,
          enableEditing: false,
        },
        {
          accessorKey: "brand",
          header: "Brand",
          enableEditing: true,
          size: 100,
        },
        {
          accessorKey: "model",
          header: "Model",
          enableEditing: true,
          size: 150,
        },
        {
          accessorKey: "config",
          header: "Config",
          enableEditing: true,
          size: 150,
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
          size: 150,
        },
        {
          accessorKey: "simSn",
          header: "Serie SIM",
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
          id: "custodianName",
          accessorFn: (row) => {
            if (!row.custodianId) return "-";
            const employeeName = employees?.find(
              (p) => p.id === row.custodianId,
            )?.name;
            return employeeName || row.custodianId;
          },
          header: "Responsabil",
          enableEditing: false,
          size: 150,

          Cell: ({ row }) => {
            const id = row.original.custodianId;

            const name = employees?.find((p) => p.id === id)?.name || id;

            return (
              <Link
                href={`/employees/${id!.toLowerCase()}`}
                style={{ color: "#007bff" }}
              >
                {name || "-"}
              </Link>
            );
          },
        },
        {
          id: "projectName",
          accessorFn: (row) =>
            projects?.find((p) => p.id === row.projectId)?.name ||
            row.projectId,
          header: "Proiect",
          size: 200,
          enableEditing: (row) => row.original.custodianId === "E0000",

          Edit: ({ row, column }) => {
            const currentId = row.original.projectId;
            const defaultValue = projects?.find((p) => p.id === currentId);

            return (
              <SingleSelect
                name={column.id}
                options={projects!.filter(
                  (p: any) => p.id === "PJ0001" || p.id === "PJ0002",
                )}
                value={defaultValue || null}
                placeholder="Proiect"
                onChange={(_, value) => {
                  const nextId = value?.id || "";
                  const nextName = value?.name || "";

                  row._valuesCache["projectId"] = nextId;

                  row._valuesCache[column.id] = nextName;
                }}
              />
            );
          },

          Cell: ({ cell }) => {
            const projectName = cell.getValue<string>() || "";

            const projectId =
              projects?.find((p) => p.name === projectName)?.id || "";

            return (
              <Link
                href={`/projects/${projectId.toLowerCase()}`}
                style={{ color: "#007bff" }}
              >
                {projectName || "-"}
              </Link>
            );
          },
        },
        {
          accessorKey: "entryId",
          header: "Intrare",
          enableEditing: false,
          size: 120,
          minSize: 50,
          enableClickToCopy: false,

          Cell: ({ cell }) => {
            const entryId = cell.getValue<string>() || "";
            return (
              <Link
                href={`/entries/${entryId.toLowerCase()}`}
                style={{ color: "#007bff" }}
              >
                {entryId || "-"}
              </Link>
            );
          },
        },
      ],
      [employees, projects],
    );
  };
