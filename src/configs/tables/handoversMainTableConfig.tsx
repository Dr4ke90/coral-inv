import DetailsPanel from "@/components/layout/DetailsPanel";
import TopToolbarActions from "@/components/layout/TopToolbarActions";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { MRT_TableOptions } from "material-react-table";
import { detailsEquipmentColumnsConfig } from "../columns/detailsPanel/detailsEquipColumnsConfig";
import { detailsTableConfig } from "./generalConfigs/detailsTableConfig";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";

export const useHandoversMainTableConfig = (): Partial<
  MRT_TableOptions<HandoverSheet>
> => {
  const { data: equipments } = useEquipment();
  return {
    renderTopToolbarCustomActions: () => {
      return <TopToolbarActions modalType="create-handover-sheet" />;
    },

    renderDetailPanel: ({ row }) => {
      if (row.original.eqList?.length === 0) return null;

      const items = row.original.eqList!.map((id) =>
        equipments?.find((e) => e.id === id),
      );

      return (
        <DetailsPanel
          items={items}
          columns={detailsEquipmentColumnsConfig}
          tableConfig={detailsTableConfig}
        />
      );
    },

    enableEditing: false,
  };
};
