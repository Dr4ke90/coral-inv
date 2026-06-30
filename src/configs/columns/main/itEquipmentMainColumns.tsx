"use client";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { EquipmentType } from "@/types/equipment.type";
import { TextField, Typography } from "@mui/material";
import { ActionableCell } from "@/components/ui/ActionableCell";

export const useItEquipmentMainTableColumnsConfig =
  (): MRT_ColumnDef<EquipmentType>[] => {
    return useMemo(
      () => [
        {
          accessorKey: "id",
          header: "ID",
          size: 30,
          enableEditing: false,
          Cell: ({ cell, row }) => (
            <ActionableCell
              value={cell.getValue<string>()}
              targetId={cell.getValue<string>()}
              fontSize="14px"
              basePath={`/${row.original.category.toLowerCase()}`}
            />
          ),
        },
        {
          accessorKey: "type",
          header: "Tip",
          enableEditing: false,
          size: 100,
          Cell: ({ cell }) => {
            return (
              <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
                {cell.getValue<string>() ?? "-"}
              </Typography>
            );
          },
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
          accessorKey: "series",
          header: "Serie",
          enableEditing: true,
          size: 100,
        },
        {
          accessorKey: "config",
          header: "Config",
          enableEditing: true,
          size: 200,
        },
        {
          accessorKey: "custodianName",
          header: "Responsabil",
          enableEditing: false,
          size: 150,
          Cell: ({ row, cell }) => (
            <ActionableCell
              value={cell.getValue<string>()}
              targetId={row.original.custodianId}
              basePath="/angajati"
            />
          ),
        },
        {
          accessorKey: "projectName",
          header: "Proiect",
          size: 200,
          enableEditing: false,
          Cell: ({ row, cell }) => (
            <ActionableCell
              value={cell.getValue<string>()}
              targetId={row.original.projectId}
              basePath="/proiecte"
            />
          ),
        },
        {
          accessorKey: "refInvoice",
          header: "Intrare",
          enableEditing: false,
          enableClickToCopy: true,
          size: 130,
          Cell: ({ row, cell }) => {
            const entryId = row.original.entryId;

            if (entryId === "-")
              return (
                <Typography sx={{ color: "#007bff", fontSize: "14px" }}>
                  {cell.getValue<string>()}{" "}
                </Typography>
              );
            else
              return (
                <ActionableCell
                  value={cell.getValue<string>()}
                  targetId={row.original.entryId}
                  fontSize="12px"
                  basePath="/intrari"
                />
              );
          },
        },
        {
          accessorKey: "requirementId",
          header: "Necesar",
          enableEditing: false,
          enableClickToCopy: true,
          size: 50,
          Cell: ({ cell }) => (
            <ActionableCell
              value={cell.getValue<string>()}
              targetId={cell.getValue<string>()}
              fontSize="12px"
              basePath="/necesar"
            />
          ),
        },
      ],
      [],
    );
  };
