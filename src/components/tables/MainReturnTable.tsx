"use client";
import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useHandoversMainColumnsConfig } from "../../configs/columns/main/handoverColumnsConfig";
import { useReturnSheets } from "@/hooks/returns/useReturnSheets";
import { useHandoversMainTableConfig } from "@/configs/tables/handoversMainTableConfig";

export const MainRetunSheetTable = () => {
  const { data, isLoading, isError } = useReturnSheets();
  const mainTableConfig = useHandoversMainTableConfig();
  const mainTableColumns = useHandoversMainColumnsConfig();

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
      columns={mainTableColumns}
      data={data?.slice().reverse() ?? []}
      tableCustomOptions={mainTableConfig}
    />
  );
};
