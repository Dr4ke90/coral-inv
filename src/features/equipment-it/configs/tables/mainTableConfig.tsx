import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { Equipment } from "../../types/equipment.type";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Equipment>> => {
  return {
    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.pvList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    enableEditing: true,
  };
};
