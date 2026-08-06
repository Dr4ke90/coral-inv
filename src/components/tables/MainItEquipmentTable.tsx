"use client";

import { Box } from "@mui/material";
import Table from "@/components/ui/table/Table";
import Loader from "@/components/ui/Loader";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { useMainItEquipmentTableConfig } from "@/configs/tables/itEquipmentMainTableConfig";
import { useItEquipmentMainTableColumnsConfig } from "@/configs/columns/main/itEquipmentMainColumns";
import { useEquipmentFilter } from "@/contexts/EquipmentFilterContext";
import { useMemo } from "react";

export const MainItEquipmentTable = () => {
  const { data, isLoading, isError } = useEquipment();
  const mainTableConfig = useMainItEquipmentTableConfig();
  const mainTableColumns = useItEquipmentMainTableColumnsConfig();
  const { selectedGroup } = useEquipmentFilter();

  const filteredData = useMemo(() => {
    return (data ?? [])
      .filter((item) =>
        selectedGroup === "Toate"
          ? item.category !== "Tablete"
          : item.category === selectedGroup,
      )
      .sort((a, b) =>
        a.id.localeCompare(b.id, undefined, {
          numeric: true,
        }),
      );
  }, [data, selectedGroup]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Box className="flex h-[calc(100vh-80px)] w-full items-center justify-center font-bold">
        Ceva nu a mers bine
      </Box>
    );
  }

  return (
    <Box className="w-full min-w-0 max-w-full overflow-hidden">
      <Table
        columns={mainTableColumns}
        data={filteredData?.slice().reverse() ?? []}
        tableCustomOptions={mainTableConfig}
      />
    </Box>
  );
};
