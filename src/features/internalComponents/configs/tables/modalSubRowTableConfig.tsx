import { subrowTableConfig } from "./subrowTableConfig";
import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import RowActions from "../../components/RowActions";
import { ComponentType } from "../../types/component.type";
import useUpdateModalTable from "@/hooks/useUpdateModalTable";

export const useModalSubRowTableConfig = (): Partial<
  MRT_TableOptions<Partial<ComponentType>>
> => {
  const { update } = useUpdateModalTable();

  return {
    ...subrowTableConfig,

    muiEditTextFieldProps: ({ cell, row }) => ({
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
    enableRowActions: false,
    enableEditing: true,

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
  };
};
