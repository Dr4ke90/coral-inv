"use client";
import dayjs from "dayjs";
import { type MRT_ColumnDef } from "material-react-table";

import { REQUIREMENT_STATUS_OPTIONS } from "@/features/requirement/constants/requirementStatus";
import { RequirementStatus } from "@/features/requirement/types/requirementStatus";
import { STATUS_COLOR_MAP } from "@/features/requirement/constants/statusColors";
import { Typography } from "@mui/material";
import { Requirement } from "../../types/requiment.type";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<Requirement>[] => {
  const { data: employees } = useEmployees();
  const { data: projects } = useProjects();

  return [
    {
      accessorKey: "id",
      header: "ID",
      enableEditing: false,
      size: 30,
    },
    {
      accessorFn: (row) => dayjs(row.date).format("DD/MM/YYYY"),
      id: "data",
      header: "Data",
      size: 40,
      enableEditing: false,
      Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM/YYYY"),
    },
    {
      accessorKey: "createdBy",
      header: "Creat",
      enableEditing: false,
      size: 200,
      Cell: ({ cell }) => {
        const id = cell.getValue<string>();
        return employees?.find((e) => e.id === id)?.name || "Se încarcă...";
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
      accessorKey: "items.length",
      header: "Nr. Echipamente",
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: "projectId",
      header: "Proiect",
      enableEditing: false,
      size: 200,
      Cell: ({ cell }) => {
        const id = cell.getValue<string>();
        return projects?.find((p) => p.id === id)?.name || "Se încarcă...";
      },
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
