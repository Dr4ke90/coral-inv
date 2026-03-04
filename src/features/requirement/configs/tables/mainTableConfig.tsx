import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";

export const mainTableConfig = <T extends MRT_RowData>(
  handleEditRow: MRT_TableOptions<T>["onEditingRowSave"],
) => {
  return {
    onEditingRowSave: handleEditRow,

    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }: { row: MRT_RowData }) => (
      <DetailsPanel row={row} />
    ),
  };
};
