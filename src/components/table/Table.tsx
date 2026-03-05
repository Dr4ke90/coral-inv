"use client";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { DEFAULT_CONFIG } from "@/components/table/configs/tableDefaultConfig";
import { useState } from "react";
import { CustomTableProps } from "@/components/table/types/tablePropsInterface";

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  customOptions,
  handleEditingRow,
}: Readonly<CustomTableProps<T>>) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  


  const table = useMaterialReactTable<T>({
    columns,
    data,
    state: { pagination, rowSelection },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () =>
        setRowSelection((prev) => ({
          ...prev,
          [row.id]: !prev[row.id],
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onEditingRowSave: handleEditingRow,
    ...DEFAULT_CONFIG(),
    ...customOptions
  })

  return (
    <MaterialReactTable table={table}
    />
  );
};

export default Table;


