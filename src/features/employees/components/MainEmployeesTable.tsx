"use client";
import Table from "@/components/table/Table";
import { useMainTableConfig } from "../configs/tables/mainTableConfig";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useMainTableColumsConfig } from "../configs/columns/mainTableColumsConfig";
import { useEmployees } from "@/hooks/useEmployees";
import { useUser } from "@/features/users/hooks/useUser";

export const MainEmployeesTable = () => {
  const { data, isLoading, isError } = useEmployees();
  const mainTableConfig = useMainTableConfig();
  const mainTableColumsConfig = useMainTableColumsConfig();
  const { user } = useUser();

  const filterData = () => {
    if (user?.role === "superuser") {
      return data?.slice().reverse();
    }
    return data
      ?.filter((e) => e.id !== "E0000")
      .slice()
      .reverse();
  };
  const filteredData = filterData();

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
      data={filteredData!}
      tableCustomOptions={mainTableConfig}
    />
  );
};
