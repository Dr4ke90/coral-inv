import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import { MRT_RowData } from "material-react-table";
import { subrowTableConfig } from "../configs/tables/subrowTableConfig";
import { rowSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";
import { useEquipment } from "@/features/equipment-it/hooks/useEquipment";

const DetailsPanel = ({ row }: { row: MRT_RowData }) => {
  const { data: equipment } = useEquipment();

  const mappedEquipments = row.original.eqList.map((eq: string) => {
    return equipment?.find((e) => e.id === eq);
  });

  return (
    <Box>
      <Table
        columns={rowSubtableColumnsConfig}
        data={mappedEquipments ?? []}
        tableCustomOptions={subrowTableConfig}
      />
    </Box>
  );
};

export default DetailsPanel;
