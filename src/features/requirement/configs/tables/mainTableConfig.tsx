import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { Requirement } from "../../types/requiment.type";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateRequirement } from "../../hooks/useUpdateRequirement";

export const useMainTableConfig = (): Partial<
  MRT_TableOptions<Requirement>
> => {
  
  const { mutate: updateOneRequirementSheet } = useUpdateRequirement();

  const updateRow = useUpdateRow<Requirement>(updateOneRequirementSheet);

  return {
    onEditingRowSave: updateRow,

    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }: { row: MRT_RowData }) => (
      <DetailsPanel row={row} />
    ),
  };
};
