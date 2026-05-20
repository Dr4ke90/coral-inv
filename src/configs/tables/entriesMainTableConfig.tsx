import { MRT_TableOptions } from "material-react-table";
import { EntryType } from "@/types/entry.type";
import TopToolbarActions from "@/components/layout/TopToolbarActions";
import DetailsPanel from "@/components/layout/DetailsPanel";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { detailsTableConfig } from "./generalConfigs/detailsTableConfig";
import { detailsEquipmentColumnsConfig } from "../columns/detailsPanel/detailsEquipColumnsConfig";
import { useUpdateRow } from "@/hooks/rows/useUpdateRow";
import { useUpdateEntry } from "@/hooks/entries/useUpdateEntry";

export const useEntriesMainTableConfig = (): Partial<
  MRT_TableOptions<EntryType>
> => {
  const { data: equipmentList } = useEquipment();
  const detailsTableColumns = detailsEquipmentColumnsConfig;
  const { mutate: updateEntry } = useUpdateEntry();

  const onRowUpdate = useUpdateRow(updateEntry);

  return {
    onEditingRowSave: onRowUpdate,
    renderTopToolbarCustomActions: () => (
      <TopToolbarActions modalType="create-entry-modal" />
    ),

    renderDetailPanel: ({ row }) => {
      if (row.original.items?.length === 0) return null;

      const pvRefIds = new Set(row.original.items);

      const filteredEquipmentList = equipmentList?.filter((item) =>
        pvRefIds.has(item.id),
      );

      return (
        <DetailsPanel
          items={filteredEquipmentList ?? []}
          tableConfig={detailsTableConfig}
          columns={detailsTableColumns}
        />
      );
    },

    enableEditing: true,
  };
};
