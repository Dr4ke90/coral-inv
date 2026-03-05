import { MRT_TableOptions } from "material-react-table";

export const DEFAULT_CONFIG = <T extends Record<string, any>>(): Partial<
  MRT_TableOptions<T>
> => ({
  initialState: {
    density: "compact",
    showGlobalFilter: true,
  },

  columnFilterDisplayMode: "popover",
  paginationDisplayMode: "pages",
  muiPaginationProps: {
    color: "primary",
    shape: "rounded",
    showRowsPerPage: false,
    variant: "outlined",
  },

  enableColumnOrdering: false,
  enableGlobalFilter: true,
  enableDensityToggle: false,
  enableBottomToolbar: true,
  enableFullScreenToggle: false,
  enableRowSelection: true,
  enableRowActions: true,
  enableRowNumbers: false,
  enableRowPinning: true,
  enableEditing: true,

  enableExpanding: true,
  enableExpandAll: false,
  enableHiding: false,
  enableColumnActions: false,
  enableStickyHeader: true,
  enableClickToCopy: true,

  editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)

  muiExpandButtonProps: ({ row, table }) => ({
    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
  }),

  getRowId: (row) => row.id,

  positionActionsColumn: "last",
  positionToolbarAlertBanner: "none",

  manualPagination: false,

  muiTableProps: {
    sx: {
      alignContent: "center",
    },
  },

  muiTableBodyCellProps: {
    sx: {
      paddingY: "2.5px",
      paddingX: "3px",
      fontSize: "0.8rem",
    },
  },

  muiTableHeadCellProps: {
    sx: {
      fontSize: "0.8rem",
      alignContent: "center",
      alignItems: "center",
      paddingY: "0px",
      paddingX: "6px",
    },
  },

  muiTableContainerProps: {
    sx: {
      width: "100%",
      height: "calc(100vh - 210px)",
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
          p: 0,
          margin: 0,
        },
      },

      muiTableBodyCellProps: {
        align: "center",
        sx: {
          textAlign: "center",
          borderLeft: "1px dotted black",
          p: 0,
          margin: 0,
          "& .MuiBox-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2px",
          },
        },
      },
    },

    "mrt-row-select": {
      size: 30,
      muiTableHeadCellProps: { align: "center" },
      muiTableBodyCellProps: { align: "center" },
    },

    "mrt-row-pin": {
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
