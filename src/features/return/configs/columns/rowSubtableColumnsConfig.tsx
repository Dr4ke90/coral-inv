"use client";
import { MRT_ColumnDef } from "material-react-table";
import Link from "next/link";
import { Equipment } from "@/features/equipment-it/types/equipment.type";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<Equipment>[] => {
  return [
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
      accessorKey: "refInvoice.sn",
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
      Cell: ({ cell }) => {
        const id = cell.getValue<string>();
        return <Link href={`/requirements/${id?.toLowerCase()}`}>{id}</Link>;
      },
    },
  ];
};
