"use client";
import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";

import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { useMainItEquipmentTableConfig } from "@/configs/tables/itEquipmentMainTableConfig";
import { useItEquipmentMainTableColumnsConfig } from "@/configs/columns/main/itEquipmentMainColumns";

export const MainAccessoriesTable = () => {
  const { data, isLoading, isError } = useEquipment();
  const mainTableConfig = useMainItEquipmentTableConfig();
  const mainTableColumns = useItEquipmentMainTableColumnsConfig();

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return (
      <Box
        className="flex items-center justify-center font-bold"
        sx={{ height: "calc(100vh - 80px)" }}
      >
        Ceva nu a mers bine
      </Box>
    );

  const filteredEquipments =
    data?.filter((eq) => eq.category === "Accesorii") ?? [];

  return (
    <Table
      columns={mainTableColumns}
      data={filteredEquipments?.slice().reverse() ?? []}
      tableCustomOptions={mainTableConfig}
    />
  );
};
