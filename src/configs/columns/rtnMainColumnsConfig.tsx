"use client";
import { Handover } from "@/types/handover/handoverInterface";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";

export const mainReturnColumnsConfig: MRT_ColumnDef<Handover>[] = [
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
    accessorFn: (row) =>
      Array.isArray(row.refEquipmentList) ? row.refEquipmentList?.length : 0,
    header: "Nr. Echipamente",
    enableEditing: false,
    size: 50,
  },
];
