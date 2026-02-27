"use client";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { type MRT_ColumnDef } from "material-react-table";

import { Requirement } from "@/types/requirement/requirementInterface";
import { REQUIREMENT_STATUS_OPTIONS } from "@/constants/requirement/requirementStatus";
import { RequirementStatus } from "@/types/requirement/requirementStatus";
import { STATUS_COLOR_MAP } from "@/constants/requirement/statusColors";

export const mainRequirementColumnsConfing: MRT_ColumnDef<Requirement>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableEditing: false,
    size: 30,
  },
  {
    accessorFn: (row) => dayjs(row.data).format("DD/MM/YYYY"),
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
    accessorKey: "itemsCount",
    header: "Nr. Echipamente",
    enableEditing: false,
    size: 50,
    Cell: ({ cell }) => cell.getValue<number>() ?? 0,
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
        <Box
          component="span"
          className="inline-block min-w-[80px] rounded text-white px-2 py-1 text-center text-[0.85rem] font-bold"
          sx={{
            backgroundColor: bgColor,
          }}
        >
          {value}
        </Box>
      );
    },
  },
];
