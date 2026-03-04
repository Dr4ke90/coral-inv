"use client";
import dayjs from "dayjs";
import { type MRT_ColumnDef } from "material-react-table";

import { Requirement } from "@/features/requirement/types/requirementInterface";
import { REQUIREMENT_STATUS_OPTIONS } from "@/features/requirement/constants/requirementStatus";
import { RequirementStatus } from "@/features/requirement/types/requirementStatus";
import { STATUS_COLOR_MAP } from "@/features/requirement/constants/statusColors";
import { Typography } from "@mui/material";

export const mainRequirementColumnsConfing: MRT_ColumnDef<Requirement>[] = [
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
  },
  {
    accessorKey: "createdBy",
    header: "Creat",
    enableEditing: false,
    size: 200,
  },
  {
    accessorKey: "totalCollectedPrice",
    header: "Pret Total",
    size: 120,
    filterFn: "between",
    enableEditing: false,
  },
  {
    id: "itemsCount",
    header: "Nr. Echipamente",
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: "project",
    header: "Proiect",
    enableEditing: false,
    size: 200,
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
