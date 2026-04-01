import { MRT_ColumnDef } from "material-react-table";
import { CategoryType } from "../../types/category.type";

export const useModalTableColumsConfig = (): MRT_ColumnDef<
  Partial<CategoryType>
>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 40,
      enableEditing: false,
    },
    {
      accessorKey: "type",
      header: "Tip",
      enableEditing: false,
      size: 100,
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
      header: "Configuratie",
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: "items.length",
      header: "Cantitate",
      enableEditing: false,
      size: 100,
    },
  ];
};
