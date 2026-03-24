import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { Tablet } from "../../types/tablet.type";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateTablet } from "../../hooks/useUpdateTablet";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Tablet>> => {
  const { mutate: updateTablet } = useUpdateTablet();
  const onRowUpdate = useUpdateRow(updateTablet);

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
