"use client";
import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useMainEmployeesTableColumsConfig } from "../../configs/columns/main/employeesColumsConfig";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useMainEmployeesTableConfig } from "@/configs/tables/mainEmployeesTableConfig";

export const MainEmployeesTable = () => {
  const { data, isLoading, isError } = useEmployees();
  const mainTableConfig = useMainEmployeesTableConfig();
  const mainTableColumsConfig = useMainEmployeesTableColumsConfig();

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
      data={data!}
      tableCustomOptions={mainTableConfig}
    />
  );
};
