"use client";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";
import { HandoverSheet } from "@/types/handoverSheet.type";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";

export const useMainTableColumnsConfig = (): MRT_ColumnDef<HandoverSheet>[] => {
  const { data: employees } = useEmployees();
  const { data: projects } = useProjects();

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
        return employees?.find((e) => e.id === id)?.name || "Se încarcă...";
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
      accessorKey: "eqList",
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
