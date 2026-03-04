import Table from "@/shared/components/table/Table";
import { mainReturnColumnsConfig } from "@/features/return/configs/rtnMainColumnsConfig";
import { Box } from "@mui/material";

const Return = () => {
  return (
    <Box>
      <Table columns={mainReturnColumnsConfig} data={[]} />
    </Box>
  );
};

export default Return;
