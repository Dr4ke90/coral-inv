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
import { ActionableCell } from "@/components/ui/ActionableCell";

export const useMainRequirementColumnsConfig =
  (): MRT_ColumnDef<Requirement>[] => {
    return [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 30,
        Cell: ({ cell }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={cell.getValue<string>()}
            fontSize="14px"
            basePath={`/necesar`}
          />
        ),
      },
      {
        accessorKey: "date",
        header: "Data",
        enableEditing: false,
        size: 150,
        Cell: ({ cell }) => {
          return (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {dayjs(cell.getValue<Date>()).format("DD / MM / YYYY") ?? "-"}
            </Typography>
          );
        },
      },
      {
        accessorKey: "userName",
        header: "Creat",
        enableEditing: false,
        size: 200,
        Cell: ({ cell, row }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={row.original.createdBy}
            fontSize="14px"
            basePath={`/utilizatori`}
          />
        ),
      },
      {
        accessorKey: "totalCollectedPrice",
        header: "Pret Total",
        size: 120,
        filterFn: "between",
        enableEditing: false,
        Cell: ({ cell }) => {
          return (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {cell.getValue<string>() ?? "-"}
            </Typography>
          );
        },
      },
      {
        accessorKey: "itemsLength",
        header: "Nr. Echipamente",
        enableEditing: false,
        size: 50,
        Cell: ({ cell }) => {
          return (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {cell.getValue<string>() ?? "-"}
            </Typography>
          );
        },
      },
      {
        accessorKey: "projectName",
        header: "Proiect",
        enableEditing: false,
        size: 200,
        Cell: ({ cell, row }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={row.original.projectId}
            fontSize="14px"
            basePath={`/proiecte`}
          />
        ),
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
