"use client";

import { EquipmentType } from "@/types/equipment.type";
import { MRT_ColumnDef } from "material-react-table";

export const detailsEquipmentColumnsConfig: MRT_ColumnDef<EquipmentType>[] = [
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
    accessorKey: "brand",
    header: "Brand",
    enableEditing: false,
    size: 150,
  },
  {
    accessorKey: "model",
    header: "Model",
    enableEditing: false,
    size: 150,
  },
  {
    accessorKey: "config",
    header: "Config",
    enableEditing: false,
    size: 300,
  },
  {
    accessorKey: "series",
    header: "Serie",
    enableEditing: false,
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Stare",
    enableEditing: false,
    size: 150,
  },

  {
    accessorKey: "refInvoice",
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
