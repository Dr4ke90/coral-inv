"use client";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useProjects } from "@/hooks/projects/useProjects";
import { HandoverSheet } from "@/types/handoverSheet.type";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";
import { useUsers } from "@/hooks/users/useUsers";
import { usePathname } from "next/navigation";

export const useHandoversMainColumnsConfig =
  (): MRT_ColumnDef<HandoverSheet>[] => {
    const { data: employees } = useEmployees();
    const { data: users } = useUsers();
    const { data: projects } = useProjects();
    const location = usePathname();

    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 30,
        enableEditing: false,
      },
      {
        accessorKey: "date",
        header: "Date",
        enableEditing: false,
        size: 300,
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "handoverPersonId",
        header: "Predator",
        enableEditing: false,
        size: 300,

        Cell: ({ cell }) => {
          const id = cell.getValue<string>();
          if (location === "/retur") {
            return employees?.find((e) => e.id === id)?.name || "Se încarcă...";
          }
          return users?.find((u) => u.id === id)?.name || "Se încarcă...";
        },
      },
      {
        accessorKey: "recipientPersonId",
        header: "Primitor",
        enableEditing: false,
        size: 300,
        Cell: ({ cell }) => {
          const id = cell.getValue<string>();

          return employees?.find((e) => e.id === id)?.name || "Se încarcă...";
        },
      },
      {
        accessorKey: "projectId",
        header: "Proiect",
        enableEditing: false,
        size: 300,
        Cell: ({ cell }) => {
          const id = cell.getValue<string>();
          return projects?.find((p) => p.id === id)?.name || "Se încarcă...";
        },
      },

      {
        accessorKey: "department",
        header: "Departament",
        enableEditing: true,
        size: 200,
      },
      {
        id: "eqNo",
        header: "Nr. echip.",
        enableEditing: false,
        size: 50,
        Cell: ({ cell }) => {
          const eqList = cell.getValue<string[]>();
          return Array.isArray(eqList) ? eqList.length : 0;
        },
      },
    ];
  };
