"use client";
import { HandoverSheet } from "@/types/handoverSheet.type";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import { ActionableCell } from "@/components/ui/ActionableCell";

export const useHandoversMainColumnsConfig =
  (): MRT_ColumnDef<HandoverSheet>[] => {
    const location = usePathname();

    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 100,
        enableEditing: false,
        Cell: ({ cell }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={cell.getValue<string>()}
            fontSize="14px"
            basePath={`/${location}`}
          />
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        enableEditing: false,
        size: 200,
        Cell: ({ cell }) => (
          <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
            {dayjs(cell.getValue<Date>()).format("DD / MM / YYYY") ?? "-"}
          </Typography>
        ),
      },
      {
        accessorKey: "handoverPersonName",
        header: "Predator",
        enableEditing: false,
        size: 300,
        Cell: ({ cell, row }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={row.original.handoverPersonId}
            fontSize="14px"
            basePath={location === "/retur" ? "/angajati" : "/utilizatori"}
          />
        ),
      },
      {
        accessorKey: "recipientPersonName",
        header: "Primitor",
        enableEditing: false,
        size: 300,
        Cell: ({ cell, row }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={row.original.recipientPersonId}
            fontSize="14px"
            basePath={"/angajati"}
          />
        ),
      },
      {
        accessorKey: "projectName",
        header: "Proiect",
        enableEditing: false,
        size: 300,
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
        accessorKey: "department",
        header: "Departament",
        enableEditing: true,
        size: 200,
      },
      {
        accessorKey: "eqNo",
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
    ];
  };
