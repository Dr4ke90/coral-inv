import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import { Project } from "../../types/project.type";
import { useCreateRow } from "@/hooks/useCreateRow";
import { createProject } from "../../factories/createProject";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useUser } from "@/features/users/hooks/useUser";
import { generatedId } from "@/shared/utils/generateId";
import { PROJECT_PREFIX } from "../../constants/constants";
import { useProjects } from "@/hooks/useProjects";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Project>> => {
  const { data } = useProjects();
  const nextId = generatedId(PROJECT_PREFIX, data);
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: postNewEmployee } = useCreateProject(nextId);
  const { user } = useUser();
  const updateRow = useUpdateRow<Project>(updateProject);

  const handleCreate = useCreateRow<Partial<Project>>({
    mutate: postNewEmployee,
    createEntity: (values) => createProject(values, user?.employeeId, nextId),
  });

  return {
    onEditingRowSave: updateRow,
    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    renderDetailPanel: ({ row }) => {
      if (row.original.eqList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    createDisplayMode: "row",
  };
};
