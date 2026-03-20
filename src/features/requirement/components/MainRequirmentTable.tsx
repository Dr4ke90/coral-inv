"use Client";
import Table from "@/components/table/Table";
import { useMainTableColumnsConfig } from "../configs/columns/mainTableColumnsConfig";
import { useRequirementData } from "../hooks/useRequirementData";
import { useMainTableConfig } from "../configs/tables/mainTableConfig";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";

export const MainRequirementTable = () => {
  const { data, isLoading, isError } = useRequirementData();
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
