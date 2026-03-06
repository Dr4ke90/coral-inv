import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { MRT_TableOptions } from "material-react-table";
import { useHandoverSheets } from "../../hooks/useHandoverSheets";
import { generatedId } from "@/shared/utils/generateId";
import { HANDOVER_PREFIX } from "../../constants/constants";
import { useUpdateHandoverSheet } from "../../hooks/useUpdateHandoverSheet";
import { useUserContext } from "@/features/users/hooks/useUserContext";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useCreateRow } from "@/hooks/useCreateRow";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useCreateHandoverSheet } from "../../hooks/useCreateHandoverSheet";
import DetailsPanel from "../../components/DetailsPanel";

export const useMainTableConfig = (): Partial<
  MRT_TableOptions<HandoverSheet>
> => {
  const { data } = useHandoverSheets();
  const nextId = generatedId(HANDOVER_PREFIX, data);
  const { mutate: updateHandoverSheet } = useUpdateHandoverSheet();
  const { mutate: postHandoverSheet } = useCreateHandoverSheet(nextId);
  const { user } = useUserContext();
  const updateRow = useUpdateRow<HandoverSheet>(updateHandoverSheet);

  const handleCreate = useCreateRow<Partial<HandoverSheet>>({
    mutate: postHandoverSheet,
    createEntity: (values) => createEmployee(values, user?.name, nextId),
  });

  return {
    onEditingRowSave: updateRow,
    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: () => <TopToolbarActions />,

    renderDetailPanel: ({ row }) => {
      if (row.original.eqList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    createDisplayMode: "row",
  };
};
