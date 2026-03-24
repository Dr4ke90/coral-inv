import { ItemsListProvider } from "@/contexts/ItemsListContext";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";
import { MainMobilePhonesTable } from "@/features/mobilePhones/components/MainMobilePhoneTable";
import AddMobilePhonesModal from "@/features/mobilePhones/components/AddMobilePhonesModal";

const TabletsPage = () => {
  return (
    <Box>
      <Modal>
        <MainMobilePhonesTable />
        <ItemsListProvider>
          <AddMobilePhonesModal />
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default TabletsPage;
