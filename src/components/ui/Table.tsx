"use client";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { DEFAULT_CONFIG } from "@/configs/table/tableDefaultConfig";
import { useState } from "react";
import { CustomTableProps } from "@/types/table/tablePropsInterface";

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  customOptions,
  onEditingRowSave,
}: Readonly<CustomTableProps<T>>) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 15,
  });

  const table = useMaterialReactTable<T>({
    ...DEFAULT_CONFIG<T>(),
    columns,
    data,
    state: { pagination },

    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onEditingRowSave,

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () =>
        setRowSelection({
          [row.id]: !rowSelection[row.id],
        }),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    ...customOptions,
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
