import { ItemsListProvider } from "@/contexts/ItemsListContext";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";
import { MainTabletsTable } from "@/features/tablets/components/MainTabletsTable";
import AddTabletsModal from "@/features/tablets/components/AddTabletsModal";

const TabletsPage = () => {
  return (
    <Box>
      <Modal>
        <MainTabletsTable />
        <ItemsListProvider>
          <AddTabletsModal />
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default TabletsPage;
