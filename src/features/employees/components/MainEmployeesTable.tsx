"use client";
import Table from "@/shared/components/table/Table";
import { useMainTableConfig } from "../configs/tables/mainTableConfig";
import { Box } from "@mui/material";
import Loader from "@/shared/components/ui/Loader";
import { mainTableColumsConfig } from "../configs/columns/mainTableColumsConfig";
import { useEmployees } from "@/hooks/useEmployees";

export const MainEmployeesTable = () => {
  const { data, isLoading, isError } = useEmployees();
  const mainTableConfig = useMainTableConfig();

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
      data={data ?? []}
      tableCustomOptions={mainTableConfig}
    />
  );
};
