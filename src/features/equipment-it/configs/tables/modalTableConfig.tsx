import { subrowTableConfig } from "./subrowTableConfig";
import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import RowActions from "../../components/RowActions";
import { Equipment } from "../../types/equipment.type";

export const useModalTableConfig = (): Partial<MRT_TableOptions<Equipment>> => {
  return {
    ...subrowTableConfig,
    muiEditTextFieldProps: ({ cell, row, table }) => ({
      onBlur: (event) => {
        const newValue = event.target.value;
        const columnId = cell.column.id;

        // Verificăm dacă valoarea chiar s-a modificat
        if (cell.getValue() === newValue) {
          return;
        }

        console.log("Se salvează automat pe blur!");
        console.log("ID Echipament:", row.original.id);
        console.log("Câmp modificat:", columnId);
        console.log("Valoare nouă:", newValue);

        // Aici poți apela funcția de salvare:
        // updateEquipment({ id: row.original.id, [columnId]: newValue });
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
