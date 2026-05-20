import { MainHandoverSheetsTable } from "@/components/tables/MainHandoverSheetTable";
import { Box } from "@mui/material";
import { ItemsListProvider } from "@/contexts/ItemsListContext";
import CreateHandoverSheetModal from "@/components/modals/CreateHandoverSheetModal";

const Handover = () => {
  return (
    <Box>
      <MainHandoverSheetsTable />
      <ItemsListProvider>
        <CreateHandoverSheetModal />
      </ItemsListProvider>
    </Box>
  );
};

export default Handover;
