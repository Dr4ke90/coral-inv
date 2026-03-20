"use client";
"use no memo";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { DEFAULT_CONFIG } from "@/components/table/configs/tableDefaultConfig";
import { useState } from "react";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import PushPinIcon from "@mui/icons-material/PushPin";

export interface CustomTableProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  tableCustomOptions?: Partial<MRT_TableOptions<T>>;
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  tableCustomOptions,
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

    ...DEFAULT_CONFIG<T>(),
    ...tableCustomOptions,

    initialState: {
      ...DEFAULT_CONFIG<T>().initialState,
      ...tableCustomOptions?.initialState,
    },

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

    muiTableContainerProps: {
      ...DEFAULT_CONFIG<T>().muiTableContainerProps,
      ...tableCustomOptions?.muiTableContainerProps,
    },

    displayColumnDefOptions: {
      ...DEFAULT_CONFIG<T>().displayColumnDefOptions,
      ...tableCustomOptions?.displayColumnDefOptions,

      "mrt-row-expand": {
        ...DEFAULT_CONFIG<T>().displayColumnDefOptions?.["mrt-row-expand"],
        ...tableCustomOptions?.displayColumnDefOptions?.["mrt-row-expand"],

        Header: <UnfoldMoreIcon fontSize="small" titleAccess="Expand" />,
      },

      "mrt-row-pin": {
        ...DEFAULT_CONFIG<T>().displayColumnDefOptions?.["mrt-row-pin"],
        ...tableCustomOptions?.displayColumnDefOptions?.["mrt-row-pin"],

        Header: <PushPinIcon fontSize="small" titleAccess="Pin" />,
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
