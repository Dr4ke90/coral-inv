"use client";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useProjects } from "@/hooks/projects/useProjects";
import { MRT_ColumnDef } from "material-react-table";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { MobileDevicesType } from "@/types/mobileDevices.type";
import { ActionableCell } from "@/components/ui/ActionableCell";

export const useMainMobileDevColumnsConfig =
  (): MRT_ColumnDef<MobileDevicesType>[] => {
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
          accessorKey: "snInvoice",
          header: "Intrare",
          enableEditing: false,
          size: 120,
          minSize: 50,
          enableClickToCopy: false,

          Cell: ({ cell, row }) => {
            const snInvoice = cell.getValue<string>();

            const refInvoice = row.original.refInvoice;

            let displayValue = "-";

            if (snInvoice && snInvoice.trim() !== "") {
              displayValue = snInvoice;
            } else if (refInvoice && refInvoice.trim() !== "") {
              displayValue = refInvoice;
            }

            return (
              <Typography sx={{ color: "#007bff", fontSize: "13px" }}>
                {displayValue}
              </Typography>
            );
          },
        },
      ],
      [],
    );
  };
