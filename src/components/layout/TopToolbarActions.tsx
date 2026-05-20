import { Box, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { MRT_RowData, MRT_TableInstance } from "material-react-table";
import Modal from "@/components/ui/Modal";

type TableProps<T extends MRT_RowData> = {
  table: MRT_TableInstance<T>;
  modalType?: never;
};

type ModalProps = {
  table?: never;
  modalType: string;
};

type Props<T extends MRT_RowData> = TableProps<T> | ModalProps;

const TopToolbarActions = <T extends MRT_RowData>(props: Props<T>) => {
  const { table, modalType } = props;

  const ActionButton = (
    <IconButton
      className="hover:bg-red-50 text-blue-600"
      onClick={() => table?.setCreatingRow(true)}
    >
      <ControlPointIcon sx={{ fontSize: 40 }} />
    </IconButton>
  );

  return (
    <Box>
      {table ? (
        ActionButton
      ) : (
        <Modal.Trigger opens={modalType!}>{ActionButton}</Modal.Trigger>
      )}
    </Box>
  );
};

export default TopToolbarActions;
