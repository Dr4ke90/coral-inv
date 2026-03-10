"use client";
import Modal from "@/shared/components/ui/Modal";
import { ModalHeaderProvider } from "../contexts/HeaderDataContext";
import ModalHeaderForm from "./ModalHeaderForm";

import ModalActions from "./ModalActions";
import { Box } from "@mui/material";
import ModalRecipientForm from "./ModalRecipientForm";
import ModalEquipmentForm from "./ModalEquipmentForm";
import Table from "@/shared/components/table/Table";
import { modalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { modalTableConfig } from "../configs/tables/modalTableConfig";
import { RecipientDataProvider } from "../contexts/RecipientContext";
import {useItemsList } from "../contexts/ItemsListContext";

const CreateHandoverModal = () => {
  

  const { previewList } = useItemsList();

  return (
    <RecipientDataProvider>
        <ModalHeaderProvider>
          <Modal.Content maxWidth="lg" name="create-handover-sheet">
            <Modal.Header title="Creaza fisa de predare">
              <ModalHeaderForm />
            </Modal.Header>

            <Modal.Body className="flex flex-row gap-2">
              <Box>
                <ModalRecipientForm />
                <hr />
                <ModalEquipmentForm />
              </Box>
              <Box className="flex-1">
                <Table
                  columns={modalTableColumsConfig}
                  data={previewList}
                  tableCustomOptions={modalTableConfig}
                />
              </Box>
            </Modal.Body>

            <ModalActions />
          </Modal.Content>
        </ModalHeaderProvider>
    </RecipientDataProvider>
  );
};

export default CreateHandoverModal;
