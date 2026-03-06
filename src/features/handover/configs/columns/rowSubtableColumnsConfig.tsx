export const rowSubtableColumnsConfig = [
  {
    accessorKey: "item",
    header: "Resursa",
    size: 400,
    grow: false,
    enableEditing: false,
    muiTableBodyCellProps: {
      sx: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        maxWidth: "280px",
        overflow: "hidden",
      },
    },
  },
  {
    accessorKey: "quantity",
    header: "Cant.",
    size: 40,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "um",
    header: "U.M.",
    size: 40,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "unitPrice",
    header: "Pret",
    size: 40,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    size: 40,
    grow: true,
    enableEditing: false,
  },
  {
    accessorKey: "currency",
    header: "Moneda",
    size: 40,
    grow: false,
    enableEditing: false,
  },
];
