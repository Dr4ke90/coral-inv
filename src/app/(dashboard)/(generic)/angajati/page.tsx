import Table from "@/shared/components/table/Table";
import { employeeMainColumnsConfig } from "@/features/employee/configs/empMainColumnsConfig";
import { Box } from "@mui/material";

const Employees = () => {
  return (
    <Box>
      <Table columns={employeeMainColumnsConfig} data={[]} />
    </Box>
  );
};

export default Employees;
