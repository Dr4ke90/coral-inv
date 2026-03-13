import { ItemsListProvider } from "@/contexts/ItemsListContext";
import AddEquipmentModal from "@/features/equipment-it/components/AddEquipmentModal";
import { MainEquipmentTable } from "@/features/equipment-it/components/MainEquipmentTable";
import Modal from "@/shared/components/ui/Modal";
import { Box } from "@mui/material";

const ItEquipmentPage = () => {
  return (
    <Box>
      <Modal>
        <MainEquipmentTable />
        <ItemsListProvider>
          <AddEquipmentModal />
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default ItEquipmentPage;
