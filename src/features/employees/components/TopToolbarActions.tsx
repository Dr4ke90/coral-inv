import { Box, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { MRT_RowData, MRT_TableInstance } from "material-react-table";

const TopToolbarActions = <T extends MRT_RowData>({
  table,
}: {
  table: MRT_TableInstance<T>;
}) => {
  return (
    <Box>
      <IconButton className="hover:bg-red-50 text-blue-600" onClick={() => table.setCreatingRow(true)}>
        <ControlPointIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default TopToolbarActions;
