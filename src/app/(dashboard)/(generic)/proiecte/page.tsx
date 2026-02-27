import Table from "@/components/ui/Table";
import { mainProjectColumnsConfig } from "@/configs/columns/pjMainColumnsConfig";
import { Box } from "@mui/material";

const Projects = () => {
  return (
    <Box>
      <Table columns={mainProjectColumnsConfig} data={[]} />
    </Box>
  );
};

export default Projects;
