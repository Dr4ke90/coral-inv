import Table from "@/components/ui/Table";
import { mainHanoverColumnsConfig } from "@/configs/columns/hvrMainColumnsConfig";
import { Box } from "@mui/material";

const Handover = () => {
  return (
    <Box>
      <Table columns={mainHanoverColumnsConfig} data={[]} />
    </Box>
  );
};

export default Handover;
