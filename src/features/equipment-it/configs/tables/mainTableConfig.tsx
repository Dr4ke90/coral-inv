import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { Equipment } from "../../types/equipment.type";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateEquipment } from "../../hooks/useUpdateEquipment";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Equipment>> => {
  const { mutate: updateEquipment } = useUpdateEquipment();
  const onRowUpdate = useUpdateRow(updateEquipment);

  return {
    onEditingRowSave: onRowUpdate,
    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.pvList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    enableEditing: true,
  };
};
