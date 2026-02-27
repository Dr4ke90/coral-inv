"use client";
import { Employee } from "@/features/employee/types/employeeInferface";
import { MRT_ColumnDef } from "material-react-table";

export const employeeMainColumnsConfig: MRT_ColumnDef<Employee>[] = [
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
    accessorFn: (row) => row.project,
    header: "Proiect",
    enableEditing: true,
    editSelectOptions: [],
    muiEditTextFieldProps: {
      select: true,
    },
    size: 200,
  },
  {
    id: "eqNr",
    accessorFn: (row) =>
      Array.isArray(row.refEquipmentList) ? row.refEquipmentList.length : 0,
    header: "Nr. Echipamente",
    enableEditing: false,
    size: 40,
  },
];
