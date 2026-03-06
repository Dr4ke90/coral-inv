"use client";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";

export const mainHanoverColumnsConfig: MRT_ColumnDef<HandoverSheet>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 30,
    enableEditing: false,
  },
  {
    accessorFn: (row) => dayjs(row.date).format("DD/MM/YYYY"),
    header: "Date",
    enableEditing: false,
    size: 300,
  },
  {
    accessorKey: "handoverPerson",
    header: "Predator",
    enableEditing: false,
    size: 300,
  },
  {
    accessorKey: "recipientPerson",
    header: "Primitor",
    enableEditing: false,
    size: 300,
  },
  {
    accessorKey: "project",
    header: "Proiect",
    enableEditing: false,
    size: 300,
  },
  {
    id: "eqNr",
    accessorFn: (row) => (Array.isArray(row.eqList) ? row.eqList?.length : 0),
    header: "Nr. echip.",
    enableEditing: false,
    size: 50,
  },
];
