import { subrowTableConfig } from "./subrowTableConfig";
import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import RowActions from "../../components/RowActions";
import { CategoryType } from "../../types/category.type";
import useUpdateModalTable from "@/hooks/useUpdateModalTable";
import DetailsPanel from "../../components/DetailsPanel";
import { useModalSubRowTableConfig } from "./modalSubRowTableConfig";
import { modalSubTableColumnsConfig } from "../columns/modalSubTableColumnsConfig";

export const useModalTableConfig = (): Partial<
  MRT_TableOptions<Partial<CategoryType>>
> => {
  const { update } = useUpdateModalTable();
  const modalSubRowTableConfig = useModalSubRowTableConfig();

  return {
    ...subrowTableConfig,

    renderDetailPanel: ({ row }) => {
      if (row.original.items?.length === 0) return null;

      return (
        <DetailsPanel
          columns={modalSubTableColumnsConfig}
          data={row.original?.items ?? []}
          tableCustomOptions={modalSubRowTableConfig}
        />
      );
    },

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
