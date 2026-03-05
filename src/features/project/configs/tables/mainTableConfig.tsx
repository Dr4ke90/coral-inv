import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import { ProjectType } from "../../types/project.type";
import { useCreateRow } from "@/features/project/hooks/useCreateRow";

export const useMainTableConfig = (): Partial<
  MRT_TableOptions<ProjectType>
> => {
  const { mutate: updateProject } = useUpdateProject();
  const updateRow = useUpdateRow<ProjectType>(updateProject);


  const handleCreate = useCreateRow();


  return {
    onEditingRowSave: updateRow,
    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    renderDetailPanel: ({ row }) => {
      console.log(row.original)

      if (row.original.eqList.length === 0) return

      return <DetailsPanel row={row} />
    },

    createDisplayMode: "row",
  };
};