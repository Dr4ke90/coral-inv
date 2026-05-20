"use client";
import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useEntriesMainTableConfig } from "../../configs/tables/entriesMainTableConfig";
import { useAllEntries } from "@/hooks/entries/useAllEntries";
import { useEntriesMainTableColumnsConfig } from "@/configs/columns/main/entriesColumnsConfig";

export const MainEntriesTable = () => {
  const { data, isLoading, isError } = useAllEntries();
  const mainTableConfig = useEntriesMainTableConfig();
  const mainTableColumns = useEntriesMainTableColumnsConfig();

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
