"use client";
import dayjs from "dayjs";
import { type MRT_ColumnDef } from "material-react-table";

import {
  REQUIREMENT_STATUS_OPTIONS,
  STATUS_COLOR_MAP,
} from "@/constants/requirementConstants";
import { RequirementStatus } from "@/types/requirementStatus";
import { Typography } from "@mui/material";
import { Requirement } from "@/types/requiment.type";
import { useProjects } from "@/hooks/projects/useProjects";
import { useUsers } from "@/hooks/users/useUsers";
import Link from "next/link";
import SingleSelect from "@/components/ui/SingleSelect";

export const useMainRequirementColumnsConfig =
  (): MRT_ColumnDef<Requirement>[] => {
    const { data: projects } = useProjects();
    const { data: users } = useUsers();

    return [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 30,
      },
      {
        accessorKey: "date",
        header: "Data",
        enableEditing: false,
        size: 150,
        Cell: ({ cell }) =>
          dayjs(cell.getValue<Date>()).format("DD / MM / YYYY"),
      },
      {
        id: "createdBy",
        accessorKey: "createdBy",
        header: "Creat",
        enableEditing: false,
        size: 200,

        Cell: ({ row }) => {
          const id = row.original.createdBy;
          const name = users?.find((p) => p.id === id)?.name || id;

          if (!id) return "-";

          return <Link href={`/users/${id.toLowerCase()}`}>{name}</Link>;
        },
      },
      {
        accessorKey: "totalCollectedPrice",
        header: "Pret Total",
        size: 120,
        filterFn: "between",
        enableEditing: false,
      },
      {
        id: "itemsLength",
        header: "Nr. Echipamente",
        enableEditing: false,
        size: 50,
        Cell: ({ row }) => row.original.items.length,
      },
      {
        id: "projectName",
        accessorFn: (row) =>
          projects?.find((p) => p.id === row.projectId)?.name || row.projectId,

        header: "Proiect",
        size: 200,

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

        Cell: ({ cell }) => cell.getValue<string>() || "-",
      },
      {
        accessorKey: "status",
        header: "Stare",
        enableEditing: true,
        editSelectOptions: REQUIREMENT_STATUS_OPTIONS,
        muiEditTextFieldProps: {
          select: true,
        },
        Cell: ({ cell }) => {
          const value = cell.getValue<RequirementStatus>();
          const bgColor = STATUS_COLOR_MAP[value] || "grey.500";

          return (
            <Typography
              sx={{
                color: bgColor,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {value}
            </Typography>
          );
        },
      },
    ];
  };
