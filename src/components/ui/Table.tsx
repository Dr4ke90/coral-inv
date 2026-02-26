import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";
import { defaultOptions } from "@/shared/table/defaultOptions";
import { useState } from "react";

interface CustomTableProps<T extends Record<string, any>> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  customOptions?: Partial<MRT_TableOptions<T>>;
  onEditingRowSave?: MRT_TableOptions<T>["onEditingRowSave"];
}

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
    ...defaultOptions<T>(),
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
