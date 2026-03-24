import { Box, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Modal from "@/components/ui/Modal";

const TopToolbarActions = () => {
  return (
    <Box>
      <Modal.Trigger opens="add-mobilePhones-modal">
        <IconButton className="hover:bg-red-50 text-blue-600">
          <ControlPointIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Modal.Trigger>
    </Box>
  );
};

export default TopToolbarActions;
