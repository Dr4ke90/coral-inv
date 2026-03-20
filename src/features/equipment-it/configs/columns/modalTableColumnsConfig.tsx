import { MRT_ColumnDef } from "material-react-table";
import { Equipment } from "../../types/equipment.type";

export const useModalTableColumsConfig = (): MRT_ColumnDef<
  Partial<Equipment>
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
      accessorKey: "config",
      header: "Config",
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: "series",
      header: "Serie",
      enableEditing: true,
      size: 100,
    },
  ];
};
