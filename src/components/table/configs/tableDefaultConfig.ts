import { MRT_TableOptions } from "material-react-table";

export const DEFAULT_CONFIG = <T extends Record<string, any>>(): Partial<
  MRT_TableOptions<T>
> => ({
  initialState: {
    density: "compact",
    showGlobalFilter: false,
    // pagination: { pageSize: 5, pageIndex: 0 },
  },

  columnFilterDisplayMode: "popover",
  paginationDisplayMode: "pages",
  muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
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

  enableExpanding: true,
  enableExpandAll: true,
  enableHiding: false,
  enableColumnActions: false,
  enableStickyHeader: true,
  enableClickToCopy: true,

  editDisplayMode: "row",

  muiExpandButtonProps: ({ row, table }) => ({
    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
  }),

  getRowId: (row) => row.id,

  positionActionsColumn: "last",
  positionToolbarAlertBanner: "none",

  manualPagination: false,

  muiTableProps: {
    sx: {
      // height: "100%",
      alignContent: "center",
    },
  },

  muiTableBodyCellProps: {
    sx: {
      border: "0.2px solid rgba(0, 0, 0, 0.2)",
      paddingY: "0px",
      paddingX: "6px",
      fontSize: "0.8rem",
    },
  },

  muiTableHeadCellProps: {
    sx: {
      border: "1px solid black",
      fontSize: "0.9rem",
      height: "35px",
      alignContent: "center",
      paddingY: "0px",
      paddingX: "6px",
    },
  },

  muiTableContainerProps: {
    sx: {
      width: "100%",
      height: "calc(100vh - 195px)",
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
