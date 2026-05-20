"use Client";
import Table from "@/components/ui/table/Table";
import { useRequirementData } from "../../hooks/requirement/useRequirementData";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useMainRequirementColumnsConfig } from "@/configs/columns/main/requirementColumnsConfig";
import { useRequirementMainTableConfig } from "@/configs/tables/requirementMainTableConfig";

export const MainRequirementTable = () => {
  const { data, isLoading, isError } = useRequirementData();
  const mainTableConfig = useRequirementMainTableConfig();
  const mainTableColumsConfig = useMainRequirementColumnsConfig();

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
