"use client";
import Loader from "@/components/ui/Loader";
import Table from "@/components/table/Table";
import { mainRequirementColumnsConfing } from "@/features/requirement/configs/rqMainColumnsConfig";
import { useRequirementContext } from "@/features/requirement/hooks/useRequirementContext";
import { Box } from "@mui/material";
import { useMemo } from "react";

const Requirement = () => {
  const { data, isLoading } = useRequirementContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Table columns={mainRequirementColumnsConfing} data={data} />
    </Box>
  );
};

export default Requirement;
