import Modal, { useModal } from "@/shared/components/ui/Modal";
import { Button } from "@mui/material";
import { usePostRequirement } from "../hooks/useCreateHandoverSheet";
import { useHeaderDataContext } from "../hooks/useHeaderDataContext";
import { useItemsListContext } from "../hooks/useItemsListContext";
import { RequirementType } from "../types/handoverSheet.type";
import { REQUIREMENT_STATUS_OPTIONS } from "../constants/requirementStatus";

const ModalActions = () => {
  const { headerData } = useHeaderDataContext();
  const { items } = useItemsListContext();
  const { mutate: postOneRequirementSheet } = usePostRequirement();
  const { closeModal } = useModal();

  const handleSaveData = () => {
    if (items.length === 0) return;

    const newSheet: RequirementType = {
      id: headerData.id || "",
      date: headerData.date || new Date(),
      createdBy: headerData.createdBy || "",
      project: headerData.project || "Coral Business Center",
      status: REQUIREMENT_STATUS_OPTIONS[0],
      items,
      totalCollectedPrice: items.reduce(
        (acc, item) => acc + (Number(item.totalPrice) || 0),
        0,
      ),
      filePreview: false,
    };

    postOneRequirementSheet(newSheet, {
      onSuccess: () => {
        closeModal();
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
