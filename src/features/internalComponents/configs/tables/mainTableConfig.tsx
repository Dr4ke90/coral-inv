import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateComponent } from "../../hooks/useUpdateComponent";
import { CategoryType } from "../../types/category.type";

export const useMainTableConfig = (): Partial<MRT_TableOptions<CategoryType>> => {
  const { mutate: updateComponent } = useUpdateComponent();
  const onRowUpdate = useUpdateRow(updateComponent);

  return {
    onEditingRowSave: onRowUpdate,
    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.items?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    enableEditing: true,
  };
};
