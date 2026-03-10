import { Box, IconButton } from "@mui/material";
import { MRT_RowData } from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePreviewList } from "../contexts/PreviewListContext";

const RowActions = ({ row }: { row: MRT_RowData }) => {
  const { removeItem } = usePreviewList();

  return (
    <Box>
      <IconButton className="hover:bg-red-50 text-blue-600">
        <DeleteIcon
          sx={{ fontSize: 20 }}
          onClick={() => removeItem(row.index)}
        />
      </IconButton>
    </Box>
  );
};

export default RowActions;
