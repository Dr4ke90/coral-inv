import Table from "@/components/ui/Table";
import { employeeMainColumnsConfig } from "@/configs/columns/empMainColumnsConfig";
import { Box } from "@mui/material";

const Employees = () => {
  return (
    <Box>
      <Table columns={employeeMainColumnsConfig} data={[]} />;
    </Box>
  );
};

export default Employees;
