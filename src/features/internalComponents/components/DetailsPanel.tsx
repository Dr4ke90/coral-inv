import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableOptions,
} from "material-react-table";

interface DetailsPanelProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  tableCustomOptions: Partial<MRT_TableOptions<T>>;
}

const DetailsPanel = <T extends MRT_RowData>({
  columns,
  data,
  tableCustomOptions,
}: DetailsPanelProps<T>) => {
  return (
    <Box>
      <Table
        columns={columns}
        data={data}
        tableCustomOptions={tableCustomOptions}
      />
    </Box>
  );
};

export default DetailsPanel;
