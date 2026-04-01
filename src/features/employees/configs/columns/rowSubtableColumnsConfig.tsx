"use client";

import { Equipment } from "@/features/equipment-it/types/equipment.type";
import { MRT_ColumnDef } from "material-react-table";

export const rowSubtableColumnsConfig: MRT_ColumnDef<Equipment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 30,
    minSize: 30,
    maxSize: 30,
    enableEditing: false,
  },
  {
    accessorKey: "type",
    header: "Tip",
    enableEditing: false,
    size: 150,
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
    size: 300,
  },
  {
    accessorKey: "series",
    header: "Serie",
    enableEditing: true,
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Stare",
    enableEditing: true,
    size: 150,
  },

  {
    accessorKey: "invoice",
    header: "S/N Fact.",
    enableEditing: false,
    size: 120,
    minSize: 50,
  },
  {
    accessorKey: "requirementId",
    header: "Necesar",
    enableEditing: false,
    size: 30,
    minSize: 30,
  },
];
