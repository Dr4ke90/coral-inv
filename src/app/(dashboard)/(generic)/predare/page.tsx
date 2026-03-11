import CreateHandoverModal from "@/features/handover/components/CreateHandoverSheetModal";
import { MainHandoverSheetsTable } from "@/features/handover/components/MainHandoverSheetTable";
import { PreviewListProvider } from "@/features/handover/contexts/PreviewListContext";
import { Box } from "@mui/material";

const Handover = () => {
  return (
    <Box>
      <MainHandoverSheetsTable />
      <PreviewListProvider>
        <CreateHandoverModal />
      </PreviewListProvider>
    </Box>
  );
};

export default Handover;
