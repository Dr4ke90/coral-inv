import { ItemsListProvider } from "@/contexts/ItemsListContext";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";
import { MainComponentsTable } from "@/features/internalComponents/components/MainComponentsTable";
import AddComponentsModal from "@/features/internalComponents/components/AddComponentsModal";

const ItComponentsPage = () => {
  return (
    <Box>
      <Modal>
        <MainComponentsTable />
        <ItemsListProvider>
          <AddComponentsModal />
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default ItComponentsPage;
