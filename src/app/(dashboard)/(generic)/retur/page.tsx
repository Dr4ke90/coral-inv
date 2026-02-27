import Table from "@/components/ui/Table";
import { mainReturnColumnsConfig } from "@/configs/columns/rtnMainColumnsConfig";
import { Box } from "@mui/material";

const Return = () => {
  return (
    <Box>
      <Table columns={mainReturnColumnsConfig} data={[]} />
    </Box>
  );
};

export default Return;
