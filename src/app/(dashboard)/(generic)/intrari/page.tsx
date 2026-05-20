import { ItemsListProvider } from "@/contexts/ItemsListContext";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";
import AddInvoiceModal from "@/components/modals/CreateEntriesModal";
import { InvoiceFormProvider } from "@/contexts/DocumentFormContext";
import { EquipmentFormProvider } from "@/contexts/EquipmentFormContext";
import { MainEntriesTable } from "@/components/tables/MainEntriesTable";

const EntriesPage = () => {
  return (
    <Box>
      <Modal>
        <MainEntriesTable />
        <ItemsListProvider>
          <InvoiceFormProvider>
            <EquipmentFormProvider>
              <AddInvoiceModal />
            </EquipmentFormProvider>
          </InvoiceFormProvider>
        </ItemsListProvider>
      </Modal>
    </Box>
  );
};

export default EntriesPage;
