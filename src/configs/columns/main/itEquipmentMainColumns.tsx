"use client";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { EquipmentType } from "@/types/equipment.type";
import { Tooltip, Typography } from "@mui/material";
import { ActionableCell } from "@/components/ui/ActionableCell";
import { usePathname } from "next/navigation";

export const useItEquipmentMainTableColumnsConfig =
  (): MRT_ColumnDef<EquipmentType>[] => {
    const location = usePathname();

    return useMemo(
      () => [
        {
          accessorKey: "id",
          header: "ID",
          size: 70,
          enableEditing: false,
          Cell: ({ cell, row }) => (
            <ActionableCell
              value={cell.getValue<string>()}
              targetId={cell.getValue<string>()}
              fontSize="14px"
              basePath={location}
            />
          ),
        },
        {
          accessorKey: "type",
          header: "Tip",
          enableEditing: false,
          enableClickToCopy: false,
        },
        {
          accessorKey: "brand",
          header: "Brand",
          enableEditing: true,
          enableClickToCopy: false,
        },
        {
          accessorKey: "model",
          header: "Model",
          enableEditing: true,
        },
        {
          accessorKey: "series",
          header: "Serie",
          enableEditing: true,
        },
        {
          accessorKey: "config",
          header: "Config",
          enableEditing: true,
          enableClickToCopy: false,

          Cell: ({ cell }) => {
            const config = cell.getValue<string>() ?? "";

            return (
              <Tooltip title={config} arrow placement="top">
                <span className="block w-[180px] truncate cursor-pointer">
                  {config}
                </span>
              </Tooltip>
            );
          },
        },
        {
          accessorKey: "custodianName",
          header: "Responsabil",
          enableEditing: false,
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
          size: 60,
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
