"use client";
import { Employee } from "@/features/employees/types/employee.type";
import { MRT_ColumnDef } from "material-react-table";

export const mainTableColumsConfig: MRT_ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 30,
    enableEditing: false,
  },
  {
    accessorKey: "name",
    header: "Nume",
    size: 200,
    enableEditing: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableEditing: true,
    size: 250,
  },
  {
    accessorKey: "telNo",
    header: "Telefon",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "position",
    header: "Functie",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "project",
    header: "Proiect",
    enableEditing: true,
    editSelectOptions: [],
    muiEditTextFieldProps: {
      select: true,
    },
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableEditing: true,
    size: 200,
  },
  {
    id: "eqNr",
    accessorFn: (row) => (Array.isArray(row.eqList) ? row.eqList.length : 0),
    header: "Nr. echip.",
    enableEditing: false,
    // size: 40,
  },
];
