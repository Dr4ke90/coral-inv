"use client";
import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useEquipment } from "../hooks/useEquipment";
import { useMainTableConfig } from "../configs/tables/mainTableConfig";
import { useMainTableColumnsConfig } from "../configs/columns/mainTableColumnsConfig";

export const MainEquipmentTable = () => {
  const { data, isLoading, isError } = useEquipment();
  const mainTableConfig = useMainTableConfig();
  const mainTableColumsConfig = useMainTableColumnsConfig();

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

  return (
    <Table
      columns={mainTableColumsConfig}
      data={data?.slice().reverse() ?? []}
      tableCustomOptions={mainTableConfig}
    />
  );
};
