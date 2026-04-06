"use client";
import { Employee } from "@/features/employees/types/employee.type";
import { useEquipment } from "@/hooks/useEquipment";
import { useProjects } from "@/hooks/useProjects";
import { MRT_ColumnDef } from "material-react-table";

export const useMainTableColumsConfig = (): MRT_ColumnDef<Employee>[] => {
  const { data: equipment } = useEquipment();
  const { data: projects } = useProjects();

  return [
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
      editSelectOptions: projects?.map((p: any) => ({
        value: p.id,
        label: p.name,
      })),
      muiEditTextFieldProps: {
        select: true,
      },
      size: 200,
      Cell: ({ row }) => {
        return projects?.find((p: any) => p.id === row.original.project)?.name;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableEditing: true,
      size: 200,
    },
    {
      id: "eqNr",
      header: "Nr. echip.",
      enableEditing: false,
      size: 100,
      Cell: ({ row }) => {
        const eqList = equipment?.filter(
          (eq: any) => eq.custodianId === row.original.id,
        );

        return eqList ? eqList.length : 0;
      },
    },
  ];
};
