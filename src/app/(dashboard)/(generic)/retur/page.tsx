import { ItemsListProvider } from "@/contexts/ItemsListContext";
import CreateReturnModal from "@/features/return/components/CreateReturnSheetModal";
import { MainRetunSheetTable } from "@/features/return/components/MainReturnTable";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";

const Return = () => {
  return (
    <Box>
      <Modal>
        <MainRetunSheetTable />
        <ItemsListProvider>
          <CreateReturnModal />
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default Return;
