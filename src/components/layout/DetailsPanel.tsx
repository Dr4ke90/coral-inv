import Table from "@/components/ui/table/Table";
import { Box } from "@mui/material";
import { MRT_ColumnDef, MRT_TableOptions } from "material-react-table";

const DetailsPanel = ({
  items,
  columns,
  tableConfig,
}: {
  items: any[];
  columns: MRT_ColumnDef<any>[];
  tableConfig: Partial<MRT_TableOptions<any>>;
}) => {
  return (
    <Box>
      <Table columns={columns} data={items} tableCustomOptions={tableConfig} />
    </Box>
  );
};

export default DetailsPanel;
