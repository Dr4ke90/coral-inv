export const modalTableColumsConfig = [
  {
    accessorKey: "id",
    header: "Nr. Inv.",
    grow: false,
    maxSize: 80,
    enableEditing: false,
  },
  {
    accessorKey: "type",
    header: "Tip",
    maxSize: 100,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "model",
    header: "Model",
    grow: true,
    size: 270,
    enableEditing: false,
  },
  {
    accessorKey: "series",
    header: "Series",
    maxSize: 130,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "status",
    header: "Stare",
    grow: true,
    enableEditing: true,
  },
];
