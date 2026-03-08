"use client";
import Modal from "@/shared/components/ui/Modal";
import { ModalHeaderProvider } from "../contexts/HeaderDataContext";
import ModalHeaderForm from "./ModalHeaderForm";

import ModalActions from "./ModalActions";
import { useEquipmentList } from "../contexts/EquipmentListContext";


const CreateRequirementModal = () => {
  const { eqList } = useEquipmentList();

  return (
    <Modal.Content maxWidth="lg" name="create-requirement">
      <ModalHeaderProvider>
        <Modal.Header title="Creaza fisa nou Necesar">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body>
         
        </Modal.Body>

        <ModalActions />
      </ModalHeaderProvider>
    </Modal.Content>
  );
};

export default CreateRequirementModal;
