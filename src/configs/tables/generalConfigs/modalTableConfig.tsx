import RowActions from "@/components/layout/RowActions";
import { MRT_RowData } from "material-react-table";
import { detailsTableConfig } from "./detailsTableConfig";

export const modalTableConfig = {
  ...detailsTableConfig,
  enableRowActions: true,
  muiTableContainerProps: {
    sx: {
      height: "40vh",
    },
  },

  muiTableHeadCellProps: {
    sx: {
      border: "1px black",
      fontSize: "0.8rem",
      alignContent: "center",
    },
  },

  muiTableBodyCellProps: {
    sx: {
      fontSize: "0.8rem",
    },
  },

  displayColumnDefOptions: {
    "mrt-row-actions": {
      header: "Act.",
      muiTableBodyCellProps: {
        sx: {
          textAlign: "center",
        },
      },
    },
  },

  renderRowActions: ({ row }: { row: MRT_RowData }) => <RowActions row={row} />,
};
