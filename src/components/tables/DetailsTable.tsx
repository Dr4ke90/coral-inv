import { Box } from "@mui/material";
import type { MRT_ColumnDef } from "material-react-table";

import Table from "@/components/ui/table/Table";
import { detailsTableConfig } from "@/configs/tables/generalConfigs/detailsTableConfig";

interface DetailsTableProps {
  columns: MRT_ColumnDef<any>[];
  data: any[];
}

export const DetailsTable = ({ columns, data }: DetailsTableProps) => {
  if (columns.length === 0) {
    return (
      <Box className="flex h-full w-full items-center justify-center font-bold">
        Coloanele tabelului nu sunt configurate.
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box className="flex h-full w-full items-center justify-center font-bold">
        Nu există date disponibile.
      </Box>
    );
  }

  return (
    <Box className="w-full min-w-0 overflow-hidden">
      <Table
        columns={columns}
        data={data}
        tableCustomOptions={detailsTableConfig}
      />
    </Box>
  );
};
