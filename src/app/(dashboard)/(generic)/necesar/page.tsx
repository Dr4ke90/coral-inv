"use client";
import Loader from "@/components/ui/Loader";
import Table from "@/components/table/Table";
import { mainRequirementColumnsConfing } from "@/features/requirement/configs/rqMainColumnsConfig";
import { Box } from "@mui/material";
import { useRequirementData } from "@/features/requirement";

const Requirement = () => {
  const { data, isLoading, isError } = useRequirementData();

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
    <Box>
      <Table columns={mainRequirementColumnsConfing} data={data ?? []} />
    </Box>
  );
};

export default Requirement;
