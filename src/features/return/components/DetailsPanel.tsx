import Table from "@/components/table/Table";
import { Box } from "@mui/material";
import { MRT_RowData } from "material-react-table";
import { subrowTableConfig } from "../configs/tables/subrowTableConfig";
import { useEquipment } from "@/hooks/useEquipment";
import Loader from "@/components/ui/Loader";
import { useMainTableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";

const DetailsPanel = ({ row }: { row: MRT_RowData }) => {
  const { data: equipment, isLoading } = useEquipment();
  const columns = useMainTableColumnsConfig();

  if (isLoading) {
    return (
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Loader />
      </Box>
    );
  }

  const mappedEquipments = equipment
    ? row.original.eqList
        .map((eq: string) => equipment.find((e) => e.id === eq))
        .filter(Boolean)
    : [];
  return (
    <Box>
      <Table
        columns={columns}
        data={mappedEquipments}
        tableCustomOptions={subrowTableConfig}
      />
    </Box>
  );
};

export default DetailsPanel;
