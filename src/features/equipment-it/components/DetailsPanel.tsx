import Table from "@/shared/components/table/Table";
import { Box } from "@mui/material";
import { MRT_RowData } from "material-react-table";
import { subrowTableConfig } from "../configs/tables/subrowTableConfig";
import { rowSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";

const DetailsPanel = ({ row }: { row: MRT_RowData }) => {
  return (
    <Box>
      <Table
        columns={rowSubtableColumnsConfig}
        data={row.original.pvList}
        tableCustomOptions={subrowTableConfig}
      />
    </Box>
  );
};

export default DetailsPanel;
