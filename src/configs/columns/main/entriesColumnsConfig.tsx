"use client";
import { MRT_ColumnDef } from "material-react-table";
import { EntryType } from "@/types/entry.type";
import dayjs from "dayjs";
import { useMemo } from "react";
import { ActionableCell } from "@/components/ui/ActionableCell";
import { Typography } from "@mui/material";

export const useEntriesMainTableColumnsConfig =
  (): MRT_ColumnDef<EntryType>[] => {
    return useMemo(
      () => [
        {
          accessorKey: "type",
          header: "Tip",
          enableEditing: true,
          size: 100,
        },
        {
          accessorKey: "id",
          header: "ID",
          enableEditing: false,
          size: 100,
          Cell: ({ cell }) => (
            <ActionableCell
              value={cell.getValue<string>()}
              targetId={cell.getValue<string>()}
              fontSize="14px"
              basePath="/intrari"
            />
          ),
        },
        {
          accessorKey: "sn",
          header: "Serie",
          enableEditing: true,
          size: 200,
        },
        {
          accessorKey: "vendor",
          header: "Furnizor",
          enableEditing: true,
          size: 150,
        },
        {
          accessorKey: "date",
          header: "Data",
          enableEditing: false,
          size: 150,
          Cell: ({ cell }) => (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {dayjs(cell.getValue<Date>()).format("DD / MM / YYYY") ?? "-"}
            </Typography>
          ),
        },

        {
          accessorKey: "total",
          header: "Valoare",
          enableEditing: false,
          size: 150,
          Cell: ({ cell }) => (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {cell.getValue<string>()}
            </Typography>
          ),
        },

        {
          accessorKey: "eqNo",
          header: "Nr Echipamente",
          enableEditing: false,
          size: 150,
          Cell: ({ cell }) => (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {cell.getValue<string>()}
            </Typography>
          ),
        },
        {
          accessorKey: "requirementId",
          header: "Necesar",
          enableEditing: true,
          editVariant: "select",
          editSelectOptions: ({ row }) => row.original.rqOptions,
          size: 150,
        },
      ],
      [],
    );
  };
