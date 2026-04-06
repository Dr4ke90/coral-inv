import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import { subrowTableConfig } from "../configs/tables/subrowTableConfig";
import { useSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";

const DetailsPanel = ({ pvList }: { pvList: any[] }) => {
  const columns = useSubtableColumnsConfig();

  return (
    <Box>
      <Table
        columns={columns}
        data={pvList}
        tableCustomOptions={subrowTableConfig}
      />
    </Box>
  );
};

export default DetailsPanel;
