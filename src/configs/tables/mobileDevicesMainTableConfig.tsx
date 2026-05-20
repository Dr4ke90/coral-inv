import { MRT_TableOptions } from "material-react-table";
import { useUpdateEquipment } from "@/hooks/it_equipment/useUpdateEquipment";
import { useUpdateRow } from "@/hooks/rows/useUpdateRow";
import { useHandoverSheets } from "@/hooks/handovers/useHandoverSheets";
import { useReturnSheets } from "@/hooks/returns/useReturnSheets";
import DetailsPane from "@/components/layout/DetailsPanel";
import { detailsTableConfig } from "./generalConfigs/detailsTableConfig";
import { MobileDevicesType } from "@/types/mobileDevices.type";
import { useHandoversMainColumnsConfig } from "../columns/main/handoverColumnsConfig";

export const useMobileDevicesTableConfig = (): Partial<
  MRT_TableOptions<MobileDevicesType>
> => {
  const { mutate: updateEquipment } = useUpdateEquipment();
  const onRowUpdate = useUpdateRow(updateEquipment);
  const { data: handoverSheets } = useHandoverSheets();
  const { data: returns } = useReturnSheets();
  const columns = useHandoversMainColumnsConfig();

  return {
    onEditingRowSave: onRowUpdate,

    renderDetailPanel: ({ row }) => {
      if (row.original.pvRef?.length === 0) return null;

      const pvPool = [...(handoverSheets ?? []), ...(returns ?? [])];

      const pvRefIds = new Set(row.original.pvRef);

      const filteredPvPool = pvPool.filter((item) => pvRefIds.has(item.id));

      return (
        <DetailsPane
          items={filteredPvPool}
          columns={columns}
          tableConfig={detailsTableConfig}
        />
      );
    },

    enableEditing: true,
  };
};
