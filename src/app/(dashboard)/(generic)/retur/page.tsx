import { ItemsListProvider } from "@/contexts/ItemsListContext";
import { MainRetunSheetTable } from "@/components/tables/MainReturnTable";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";
import CreateHandoverSheetModal from "@/components/modals/CreateHandoverSheetModal";

const Return = () => {
  return (
    <Box>
      <Modal>
        <MainRetunSheetTable />
        <ItemsListProvider>
          <CreateHandoverSheetModal />
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default Return;
