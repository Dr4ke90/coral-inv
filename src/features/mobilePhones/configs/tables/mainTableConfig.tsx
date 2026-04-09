import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateMobilePhone } from "../../hooks/useUpdateMobilePhone";
import { MobilePhone } from "../../types/phones.type";

export const useMainTableConfig = (): Partial<
  MRT_TableOptions<MobilePhone>
> => {
  const { mutate: updatePhone } = useUpdateMobilePhone();
  const onRowUpdate = useUpdateRow(updatePhone);

  return {
    onEditingRowSave: async ({ table, row }) => {
      const editingRow = table.getState().editingRow;

      const actualValues = (editingRow as any)?._values;
      onRowUpdate({ table, row, values: actualValues });
      table.setEditingRow(null);
    },
    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.pvList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    enableEditing: true,
  };
};
