export const modalTableColumsConfig = [
  {
    accessorKey: "id",
    header: "ID",
    size: 40,
    enableEditing: false,
  },
  {
    accessorKey: "type",
    header: "Tip",
    size: 100,
    enableEditing: false,
  },
  {
    accessorKey: "model",
    header: "Model",
    enableEditing: false,
    size: 150,
    // muiEditTextFieldProps: ({ cell, row }) => ({
    //   onChange: (e) => handleUpdateEquipment(e, cell, row),
    // }),
  },
  {
    accessorKey: "config",
    header: "Config",
    enableEditing: false,
    size: 150,
  },
  {
    accessorKey: "series",
    header: "Serie",
    size: 100,
    enableEditing: true,
  },
];
