import { MRT_ColumnDef } from "material-react-table";
import { ResourceType } from "@/types/resource.type";

export const requirementModalColumnsConfig = (): MRT_ColumnDef<
  Partial<ResourceType>
>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 40,
      enableEditing: false,
    },
    {
      accessorKey: "item",
      header: "Denumire resursa",
      enableEditing: false,
      size: 400,
    },

    {
      accessorKey: "unitPrice",
      header: "Pret unitar",
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: "quantity",
      header: "QTY",
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: "um",
      header: "U.M.",
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: "currency",
      header: "Moneda",
      enableEditing: false,
      size: 50,
    },
  ];
};
