import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { Equipment } from "../../types/equipment.type";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateEquipment } from "../../hooks/useUpdateEquipment";
import { useHandoverSheets } from "@/hooks/useHandoverSheets";
import { useReturnSheets } from "@/hooks/useReturnSheets";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Equipment>> => {
  const { mutate: updateEquipment } = useUpdateEquipment();
  const onRowUpdate = useUpdateRow(updateEquipment);
  const { data: handoverSheets } = useHandoverSheets();
  const { data: returns } = useReturnSheets();

  return {
    onEditingRowSave: onRowUpdate,
    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.pvRef?.length === 0) return null;

      const pvPool = [...(handoverSheets ?? []), ...(returns ?? [])];

      const pvRefIds = new Set(row.original.pvRef);

      const filteredPvPool = pvPool.filter((item) => pvRefIds.has(item.id));

      return <DetailsPanel pvList={filteredPvPool} />;
    },

    enableEditing: true,
  };
};
