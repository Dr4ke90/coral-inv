"use client";
import Table from "@/components/table/Table";
import { mainTableColumnsConfig } from "../configs/columns/mainTableColumnsConfig";
import { useMainTableConfig } from "../configs/tables/mainTableConfig";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useProjects } from "@/hooks/useProjects";

export const MainProjectsTable = () => {
  const { data, isLoading, isError } = useProjects();
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
      columns={mainTableColumnsConfig}
      data={data?.slice().reverse() ?? []}
      tableCustomOptions={mainTableConfig}
    />
  );
};
