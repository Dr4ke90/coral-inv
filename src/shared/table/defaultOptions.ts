import { MRT_TableOptions } from "material-react-table";

export const defaultOptions = <T extends Record<string, any>>(): Partial<
  MRT_TableOptions<T>
> => ({
  initialState: {
    density: "compact",
    showGlobalFilter: false,
    pagination: { pageSize: 25, pageIndex: 1 },
  },

  columnFilterDisplayMode: "popover",

  createDisplayMode: "row",

  enableColumnOrdering: false,
  enableGlobalFilter: true,
  enableDensityToggle: false,
  enableBottomToolbar: true,
  enableFullScreenToggle: false,
  enableRowSelection: true,
  enableRowActions: true,
  enableRowNumbers: true,
  enableRowPinning: true,
  enableEditing: true,
  enablePagination: true,
  enableExpanding: true,
  enableExpandAll: false,
  enableHiding: false,
  enableColumnActions: false,
  enableStickyHeader: true,
  enableClickToCopy: true,

  editDisplayMode: "row",

  muiTableBodyRowProps: ({ row }) => ({
    sx: {
      cursor: "pointer",
      backgroundColor: row.index % 2 === 0 ? "#f9f9f9" : "#f1f1f1",
    },
  }),

  muiExpandButtonProps: ({ row, table }) => ({
    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
  }),

  getRowId: (row) => row.id,

  positionActionsColumn: "last",
  positionToolbarAlertBanner: "none",

  muiTableProps: {
    sx: {
      height: "95%",
      alignContent: "center",
    },
  },

  muiTableBodyCellProps: {
    sx: {
      border: "0.2px solid rgba(0, 0, 0, 0.2)",
      paddingY: "0px",
      paddingX: "6px",
      fontSize: "0.8rem",
      height: "10px !important",
    },
  },
  muiTableHeadCellProps: {
    sx: {
      border: "1px solid black",
      paddingY: "4px",
      paddingX: "10px",
      fontSize: "0.9rem",
      height: "35px",
    },
  },

  muiTableContainerProps: {
    sx: {
      width: "100%",
      height: "calc(100vh - 138px)",
      overflowY: "auto",
      padding: "0 10px 0 10px",
    },
  },

  displayColumnDefOptions: {
    "mrt-row-actions": {
      header: "Acțiuni",
      size: 100,
      muiTableHeadCellProps: {
        align: "center",
        sx: {
          textAlign: "center",
          border: "0.2px solid rgb(0, 0, 0)",
          p: 0,
          margin: 0,
        },
      },

      muiTableBodyCellProps: {
        align: "center",
        sx: {
          textAlign: "center",
          border: "0.2px solid rgba(0, 0, 0, 0.2)",
          p: 0,
          margin: 0,
        },
      },
    },

    "mrt-row-select": {
      size: 30,
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },

    "mrt-row-expand": {
      size: 30,
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },

    "mrt-row-numbers": {
      size: 30,
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },
  },
});
