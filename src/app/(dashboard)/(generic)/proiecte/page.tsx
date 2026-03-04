import Table from "@/shared/components/table/Table";
import { mainProjectColumnsConfig } from "@/features/project/configs/pjMainColumnsConfig";
import { Box } from "@mui/material";

const Projects = () => {
  return (
    <Box>
      <Table columns={mainProjectColumnsConfig} data={[]} />
    </Box>
  );
};

export default Projects;
