import Table from "@/shared/components/table/Table";
import { mainHanoverColumnsConfig } from "@/features/handover/configs/hvrMainColumnsConfig";
import { Box } from "@mui/material";

const Handover = () => {
  return (
    <Box>
      <Table columns={mainHanoverColumnsConfig} data={[]} />
    </Box>
  );
};

export default Handover;
