"use client";
import { MRT_ColumnDef } from "material-react-table";
import { EntryType } from "@/types/entry.type";
import { useRequirementData } from "@/hooks/requirement/useRequirementData";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useEntriesMainTableColumnsConfig =
  (): MRT_ColumnDef<EntryType>[] => {
    const { data: requirements } = useRequirementData();

    return useMemo(
      () => [
        {
          accessorKey: "type",
          header: "Tip",
          enableEditing: true,
          size: 100,
        },
        {
          accessorKey: "id",
          header: "ID",
          enableEditing: false,
          size: 100,
        },
        {
          accessorKey: "sn",
          header: "Serie",
          enableEditing: false,
          size: 200,
        },
        {
          accessorKey: "vendor",
          header: "Furnizor",
          enableEditing: true,
          size: 150,
        },
        {
          accessorKey: "date",
          header: "Data",
          enableEditing: false,
          size: 150,
          Cell: ({ cell }) =>
            dayjs(cell.getValue<Date>()).format("DD / MM / YYYY"),
        },

        {
          accessorKey: "total",
          header: "Valoare",
          enableEditing: false,
          size: 150,
        },

        {
          id: "eqNo",
          header: "Nr Echipamente",
          enableEditing: false,
          size: 150,
          Cell: ({ row }) => row.original.items.length,
        },
        {
          accessorKey: "requirementId",
          header: "Necesar",
          enableEditing: true,
          editVariant: "select",
          editSelectOptions: requirements
            ? requirements.map((req) => req.id).reverse()
            : [],
          size: 150,
        },
      ],
      [requirements],
    );
  };
