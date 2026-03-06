"use client";
import Modal from "@/shared/components/ui/Modal";
import { ModalHeaderProvider } from "../contexts/HeaderDataContext";
import ModalHeaderForm from "./ModalHeaderForm";
import RequirmentForm from "./ModalForm";
import Table from "@/shared/components/table/Table";
import ModalActions from "./ModalActions";
import { rowSubtableColumnsConfig } from "../../requirement/configs/columns/rowSubtableColumnsConfig";
import { modalTableConfig } from "../../requirement/configs/tables/modalTableConfig";
import { useEquipmentList } from "../contexts/ItemsListContext";

const CreateRequirementModal = () => {
  const { items } = useEquipmentList();

  return (
    <Modal.Content maxWidth="lg" name="create-requirement">
      <ModalHeaderProvider>
        <Modal.Header title="Creaza fisa nou Necesar">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body>
          <RequirmentForm>
            <Table
              columns={rowSubtableColumnsConfig}
              data={items}
              tableCustomOptions={modalTableConfig}
            />
          </RequirmentForm>
        </Modal.Body>

        <ModalActions />
      </ModalHeaderProvider>
    </Modal.Content>
  );
};

export default CreateRequirementModal;
