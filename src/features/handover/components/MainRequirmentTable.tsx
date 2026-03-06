"use client";
import Table from "@/shared/components/table/Table";
import { Box } from "@mui/material";
import Loader from "@/shared/components/ui/Loader";
import { useHandoverSheets } from "../hooks/useHandoverSheets";

export const MainHandoverSheetsTable = () => {
  const { data, isLoading, isError } = useHandoverSheets();
  const mainTableConfig = useMainTableConfi();

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
