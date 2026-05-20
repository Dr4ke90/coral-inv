import { MRT_TableOptions } from "material-react-table";

import { useUpdateRow } from "@/hooks/rows/useUpdateRow";
import { useUpdateProject } from "../../hooks/projects/useUpdateProject";
import { ProjectType } from "@/types/project.type";
import { useCreateRow } from "@/hooks/rows/useCreateRow";
import { projectFactory } from "@/factories/projectFactory";
import { useCreateProject } from "../../hooks/projects/useCreateProject";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import { PROJECT_PREFIX } from "../../constants/projectsConstants";
import { useProjects } from "@/hooks/projects/useProjects";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import TopToolbarActions from "@/components/layout/TopToolbarActions";
import DetailsPanel from "@/components/layout/DetailsPanel";
import { useUser } from "@/contexts/AuthContext";
import { detailsTableConfig } from "./generalConfigs/detailsTableConfig";
import { detailsEquipmentColumnsConfig } from "../columns/detailsPanel/detailsEquipColumnsConfig";

export const useMainProjectsTableConfig = (): Partial<
  MRT_TableOptions<ProjectType>
> => {
  const { data } = useProjects();
  const nextId = docsIdGenerator(PROJECT_PREFIX, data);
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: postNewProject } = useCreateProject(nextId);
  const { user } = useUser();
  const updateRow = useUpdateRow<ProjectType>(updateProject);
  const { data: equipment } = useEquipment();

  const handleCreate = useCreateRow<Partial<ProjectType>>({
    mutate: postNewProject,
    createEntity: (values) => projectFactory(values, user?.id, nextId),
  });

  return {
    onEditingRowSave: updateRow,
    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    renderDetailPanel: ({ row }) => {
      const mappedEquipments = equipment?.filter(
        (e: any) => e.projectId === row.original.id,
      );

      if (mappedEquipments?.length === 0) return null;

      return (
        <DetailsPanel
          items={mappedEquipments!}
          columns={detailsEquipmentColumnsConfig}
          tableConfig={detailsTableConfig}
        />
      );
    },

    createDisplayMode: "row",
  };
};
