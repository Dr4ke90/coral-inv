"use client";
import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useProjects } from "@/hooks/projects/useProjects";
import { useMainProjectsTableConfig } from "@/configs/tables/projectsMainTableConfig";
import { useMainProjectsTableColumnsConfig } from "@/configs/columns/main/projectsColumnsConfig";

export const MainProjectsTable = () => {
  const { data, isLoading, isError } = useProjects();
  const mainTableConfig = useMainProjectsTableConfig();
  const mainTableColumnsConfig = useMainProjectsTableColumnsConfig();

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
      data={data!}
      tableCustomOptions={mainTableConfig}
    />
  );
};
