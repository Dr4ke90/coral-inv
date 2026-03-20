import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import { rowSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";
import { subrowTableConfig } from "../configs/tables/subrowTableConfig";
import { MRT_RowData } from "material-react-table";

const DetailsPanel = ({ row }: { row: MRT_RowData }) => {
  return (
    <Box>
      <Table
        columns={rowSubtableColumnsConfig}
        data={row.original.eqList}
        tableCustomOptions={subrowTableConfig}
      />
    </Box>
  );
};

export default DetailsPanel;
