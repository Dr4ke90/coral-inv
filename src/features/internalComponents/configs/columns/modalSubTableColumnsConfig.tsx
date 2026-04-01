export const modalSubTableColumnsConfig = [
  {
    accessorKey: "id",
    header: "Nr. Inv.",
    grow: false,
    maxSize: 80,
    enableEditing: false,
  },
  {
    accessorKey: "series",
    header: "Serie",
    maxSize: 100,
    grow: false,
    enableEditing: true,
  },
  {
    accessorKey: "refInvoice.sn",
    header: "Ref. Factura",
    grow: true,
    size: 80,
    enableEditing: false,
  },
  {
    accessorKey: "price",
    header: "Pret",
    grow: true,
    size: 80,
    enableEditing: false,
  },
  {
    accessorKey: "requirementId",
    header: "ID Necesar",
    grow: true,
    size: 80,
    enableEditing: false,
  },
];
