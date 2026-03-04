"use client"
import Modal from "@/shared/components/ui/Modal";
import { ModalHeaderProvider } from "../contexts/HeaderDataContext";
import ModalHeaderForm from "./ModalHeaderForm";
import RequirmentForm from "./ModalForm";
import Table from "@/shared/components/table/Table";
import ModalActions from "./ModalActions";
import { rowSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";
import { modalTableConfig } from "../configs/tables/modalTableConfig";
import { useItemsListContext } from "../hooks/useItemsListContext";

const CreateRequirementModal = () => {
  const { items } = useItemsListContext();

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
