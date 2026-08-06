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

  editDisplayMode: "row",

  muiExpandButtonProps: ({ row, table }) => ({
    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
  }),

  getRowId: (row) => row.id,

  positionActionsColumn: "last",
  positionToolbarAlertBanner: "none",

  manualPagination: false,

  muiTablePaperProps: {
    sx: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      overflow: "hidden",
      boxShadow: "none",
    },
  },

  muiTableProps: {
    sx: {
      width: "100%",
      minWidth: 0,
    },
  },

  muiTableBodyCellProps: {
    align: "left",
    sx: {
      boxSizing: "border-box",
      paddingY: "2.5px",
      paddingX: "6px",
      fontSize: "0.8rem",
      minWidth: 0,
      overflow: "hidden",
      borderLeft: "1px dotted",
    },
  },

  muiTableHeadCellProps: {
    align: "left",
    sx: {
      boxSizing: "border-box",
      paddingY: "2.5px",
      paddingX: "6px",
      fontSize: "0.8rem",
      minWidth: 0,
      // whiteSpace: "nowrap",
      borderLeft: "1px dotted",
    },
  },

  muiTableContainerProps: {
    sx: {
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      boxSizing: "border-box",

      overflowY: "auto",
      overflowX: "hidden",

      padding: "0 10px",
      height: "calc(100vh - 210px)",
    },
  },

  displayColumnDefOptions: {
    "mrt-row-actions": {
      header: "Acțiuni",
      size: 100,
      minSize: 100,
      maxSize: 100,
      grow: false,

      muiTableHeadCellProps: {
        align: "center",
        sx: {
          textAlign: "center",
          padding: "4px 0",
          margin: 0,
        },
      },

      muiTableBodyCellProps: {
        align: "center",
        sx: {
          textAlign: "center",
          borderLeft: "1px dotted black",
          padding: 0,
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
      minSize: 30,
      maxSize: 30,
      grow: false,

      muiTableHeadCellProps: {
        align: "center",
        sx: {
          padding: "0 !important",
        },
      },

      muiTableBodyCellProps: {
        align: "center",
        sx: {
          padding: "0 !important",
        },
      },
    },

    "mrt-row-pin": {
      size: 30,
      minSize: 30,
      maxSize: 30,
      grow: false,

      muiTableHeadCellProps: {
        align: "center",
        sx: {
          padding: "0 !important",
        },
      },

      muiTableBodyCellProps: {
        align: "center",
        sx: {
          padding: "0 !important",
        },
      },
    },

    "mrt-row-expand": {
      size: 30,
      minSize: 30,
      maxSize: 30,
      grow: false,

      muiTableHeadCellProps: {
        align: "center",
        sx: {
          padding: "0 !important",
        },
      },

      muiTableBodyCellProps: {
        align: "center",
        sx: {
          padding: "0 !important",
        },
      },
    },
  },
});
