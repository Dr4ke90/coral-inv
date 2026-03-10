"use client";
import CreateHandoverModal from "@/features/handover/components/CreateHandoverSheetModal";
import { MainHandoverSheetsTable } from "@/features/handover/components/MainRequirmentTable";
import { ItemsListProvider } from "@/features/handover/contexts/ItemsListContext";
import { Box } from "@mui/material";

const Handover = () => {
  return (
    <Box>
      <MainHandoverSheetsTable />
      <ItemsListProvider>
        <CreateHandoverModal />
      </ItemsListProvider>
    </Box>
  );
};

export default Handover;
