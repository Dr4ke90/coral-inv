import { HandoverSheet } from "@/types/handoverSheet.type";
import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";

export const useMainTableConfig = (): Partial<
  MRT_TableOptions<HandoverSheet>
> => {
  return {
    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.eqList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    enableEditing: false,
  };
};
