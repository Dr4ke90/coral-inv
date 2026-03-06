import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import { Project } from "../../types/project.type";
import { useCreateRow } from "@/hooks/useCreateRow";
import { createProject } from "../../factories/createProject";
import { useProjects } from "../../hooks/useProjects";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useUserContext } from "@/features/users/hooks/useUserContext";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Project>> => {
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: postNewProject } = useCreateProject();
  const { user } = useUserContext();
  const updateRow = useUpdateRow<Project>(updateProject);
  const { data } = useProjects();

  const handleCreate = useCreateRow<Partial<Project>>({
    mutate: postNewProject,
    createEntity: (values) => createProject(values, user?.name, data),
  });

  return {
    onEditingRowSave: updateRow,
    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    renderDetailPanel: ({ row }) => {
      console.log(row.original);

      if (row.original.eqList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    createDisplayMode: "row",
  };
};
