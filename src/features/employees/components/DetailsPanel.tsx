import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import { rowSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";
import { subrowTableConfig } from "../configs/tables/subrowTableConfig";

const DetailsPanel = ({ equipments }: { equipments: any[] }) => {
  return (
    <Box>
      <Table
        columns={rowSubtableColumnsConfig}
        data={equipments ?? []}
        tableCustomOptions={subrowTableConfig}
      />
    </Box>
  );
};

export default DetailsPanel;
