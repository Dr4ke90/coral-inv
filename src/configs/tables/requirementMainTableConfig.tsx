import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import DetailsPanel from "@/components/layout/DetailsPanel";
import TopToolbarActions from "@/components/layout/TopToolbarActions";
import { Requirement } from "../../types/requiment.type";
import { useUpdateRow } from "@/hooks/rows/useUpdateRow";
import { useUpdateRequirement } from "../../hooks/requirement/useUpdateRequirement";
import { detailsTableConfig } from "./generalConfigs/detailsTableConfig";
import { detailsResourcesColumnsConfig } from "../columns/detailsPanel/detailsResourcesColumsConfig";

export const useRequirementMainTableConfig = (): Partial<
  MRT_TableOptions<Requirement>
> => {
  const { mutate: updateOneRequirementSheet } = useUpdateRequirement();

  const updateRow = useUpdateRow<Requirement>(updateOneRequirementSheet);

  return {
    onEditingRowSave: updateRow,

    renderTopToolbarCustomActions: () => (
      <TopToolbarActions modalType="create-requirement" />
    ),

    renderDetailPanel: ({ row }: { row: MRT_RowData }) => (
      <DetailsPanel
        items={row.original.items}
        columns={detailsResourcesColumnsConfig}
        tableConfig={detailsTableConfig}
      />
    ),
  };
};
