import Modal, { useModal } from "@/shared/components/ui/Modal";
import { Button } from "@mui/material";
import { useHeaderData } from "../contexts/HeaderDataContext";
import { useRecipientData } from "../contexts/RecipientContext";
import { useItemsList } from "../contexts/ItemsListContext";
import { useCreateHandoverSheet } from "../hooks/useCreateHandoverSheet";

const ModalActions = () => {
  const { headerData, resetHeader } = useHeaderData();
  const { recipientData, resetRecipient } = useRecipientData();
  const { eqList, clearItems } = useItemsList();
  const { mutate: postHandoverSheet } = useCreateHandoverSheet();

  const { closeModal } = useModal();

  const handleSaveData = () => {
    const newSheet = {
      ...headerData,
      ...recipientData,
      eqList,
    };

    postHandoverSheet(newSheet, {
      onSuccess: () => {
        closeModal();
        resetHeader();
        resetRecipient();
        clearItems();
      },
    });
  };

  return (
    <Modal.Actions>
      <Modal.Close>
        <Button variant="outlined" color="primary">
          Anulează
        </Button>
      </Modal.Close>
      <Button variant="contained" color="success" onClick={handleSaveData}>
        Salvează
      </Button>
    </Modal.Actions>
  );
};

export default ModalActions;
