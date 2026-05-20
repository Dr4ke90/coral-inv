import { MainEmployeesTable } from "@/components/tables/MainEmployeesTable";
import Modal from "@/components/ui/Modal";
import { Box } from "@mui/material";

const EmployeesPage = () => {
  return (
    <Box>
      <Modal>
        <MainEmployeesTable />
      </Modal>
    </Box>
  );
};

export default EmployeesPage;
