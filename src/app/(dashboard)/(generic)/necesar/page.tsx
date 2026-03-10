"use client";
import Loader from "@/shared/components/ui/Loader";
import { Box } from "@mui/material";
import {
  MainRequirementTable,
  Requirement,
  useRequirementData,
  useUpdateRequirement,
} from "@/features/requirement";
import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { onRowUpdates } from "@/shared/utils/onRowUpdate";
import { useUser } from "@/features/users/hooks/useUser";
import Modal from "@/shared/components/ui/Modal";
import CreateRequirementModal from "@/features/requirement/components/CreateRqSheetModal";

const RequirementPage = () => {
  const { data, isLoading, isError } = useRequirementData();
  const { user } = useUser();
  const { mutate: updateSheet } = useUpdateRequirement();

  const handleEditRow = ({
    table,
    row,
    values,
  }: {
    table: MRT_TableInstance<Requirement>;
    row: MRT_Row<Requirement>;
    values: Record<string, unknown>;
  }) => {
    if (!user) {
      table.setEditingRow(null);
      return;
    }

    const updates = onRowUpdates(row, values, user);

    if (!updates) {
      table.setEditingRow(null);
      return;
    }

    updateSheet({ id: row.original.id, payload: updates });

    table.setEditingRow(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return (
      <Box
        className="flex items-center justify-center font-bold"
        sx={{ height: "calc(100vh - 80px)" }}
      >
        Ceva nu a mers bine
      </Box>
    );

  return (
    <Modal>
      <Box>
        <MainRequirementTable
          data={data?.slice().reverse() ?? []}
          onEdit={handleEditRow}
        />
      </Box>

      <CreateRequirementModal />
    </Modal>
  );
};

export default RequirementPage;
