"use client";
import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import Loader from "@/components/ui/Loader";
import { useUsersMainColumnsConfig } from "../../configs/columns/main/usersColumsConfig";
import { useUsers } from "@/hooks/users/useUsers";
import { useUsersMainTableConfig } from "@/configs/tables/usersMainTableConfig";

export const MainUsersTable = () => {
  const { data, isLoading, isError } = useUsers();
  const mainTableConfig = useUsersMainTableConfig();
  const mainTableColumns = useUsersMainColumnsConfig();

  const filteredData = data
    ?.filter((e) => e.id !== "U0000")
    .slice()
    .reverse();

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
      data={filteredData!}
      tableCustomOptions={mainTableConfig}
    />
  );
};
