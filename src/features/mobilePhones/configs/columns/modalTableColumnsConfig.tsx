import { MRT_ColumnDef } from "material-react-table";
import { MobilePhone } from "../../types/phones.type";

export const useModalTableColumsConfig = (): MRT_ColumnDef<
  Partial<MobilePhone>
>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 40,
      enableEditing: false,
    },
    {
      accessorKey: "model",
      header: "Model",
      enableEditing: true,
      size: 250,
    },
    {
      accessorKey: "imei",
      header: "IMEI",
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: "series",
      header: "Serie",
      enableEditing: true,
      size: 150,
    },
    {
      accessorKey: "config",
      header: "Config",
      enableEditing: true,
      size: 150,
    },
  ];
};
