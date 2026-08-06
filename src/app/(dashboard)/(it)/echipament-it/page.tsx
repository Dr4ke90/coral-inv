"use client";

import { Box } from "@mui/material";
import { MainItEquipmentTable } from "@/components/tables/MainItEquipmentTable";
import EqSideBar from "@/components/layout/EqSideBar";
import { EquipmentFilterProvider } from "@/contexts/EquipmentFilterContext";

const ItEquipmentPage = () => {
  return (
    <EquipmentFilterProvider>
      <Box className="relative flex h-[calc(100vh-80px)] w-full min-w-0 overflow-hidden">
        <Box className="shrink-0">
          <EqSideBar />
        </Box>

        <Box component="main" className="min-w-0 flex-1 overflow-hidden">
          <MainItEquipmentTable />
        </Box>
      </Box>
    </EquipmentFilterProvider>
  );
};

export default ItEquipmentPage;
