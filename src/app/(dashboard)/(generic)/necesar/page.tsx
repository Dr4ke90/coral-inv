import Table from "@/components/ui/Table";
import { mainRequirementColumnsConfing } from "@/configs/columns/rqMainColumnsConfig";
import { Box } from "@mui/material";

const Requirement = () => {
  return (
    <Box>
      <Table columns={mainRequirementColumnsConfing} data={[]} />;
    </Box>
  );
};

export default Requirement;
