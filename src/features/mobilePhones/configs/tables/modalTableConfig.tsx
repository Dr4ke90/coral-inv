import { subrowTableConfig } from "./subrowTableConfig";
import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import RowActions from "../../components/RowActions";
import { MobilePhone } from "../../types/phones.type";
import useUpdateModalTable from "../../../../hooks/useUpdateModalTable";

export const useModalTableConfig = (): Partial<
  MRT_TableOptions<Partial<MobilePhone>>
> => {
  const { update } = useUpdateModalTable();

  return {
    ...subrowTableConfig,

    muiEditTextFieldProps: ({ cell, row, table }) => ({
      onBlur: (event) => {
        const newValue = event.target.value;
        const columnId = cell.column.id;

        if (cell.getValue() === newValue) {
          return;
        }

        update(row?.id, columnId, newValue);
      },
    }),

    editDisplayMode: "table",
    enableRowActions: true,
    enableEditing: true,
    muiTableContainerProps: {
      sx: {
        height: "50vh",
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

    renderRowActions: ({ row }: { row: MRT_RowData }) => (
      <RowActions row={row} />
    ),
  };
};
