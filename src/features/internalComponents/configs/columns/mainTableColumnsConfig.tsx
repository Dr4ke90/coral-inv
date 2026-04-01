"use client";
import { MRT_ColumnDef } from "material-react-table";
import dayjs from "dayjs";
import { CategoryType } from "../../types/category.type";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<CategoryType>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
      minSize: 50,
      maxSize: 50,
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
      accessorKey: "brand",
      header: "Brand",
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
      accessorFn: (row) => {
        const latest = row.items.sort(
          (a, b) =>
            (b?.addedAt ? new Date(b.addedAt).getTime() : 0) -
            (a?.addedAt ? new Date(a.addedAt).getTime() : 0),
        )[0]?.addedAt;
        return latest ? dayjs(new Date(latest)).format("DD/MM/YYYY") : "";
      },
      header: "Ultima intrare",
      enableEditing: false,
      size: 150,
    },

    {
      accessorFn: (row) => row.items.length,
      header: "Stoc Total",
      enableEditing: false,
      size: 150,
    },
    {
      accessorFn: (row) => row.items.filter((item) => item.pvId !== "").length,
      header: "Utilizat",
      enableEditing: false,
      size: 150,
    },
    {
      accessorFn: (row) => row.items.filter((item) => item.pvId === "").length,
      header: "Disponibil",
      enableEditing: false,
      size: 150,
    },
  ];
};
