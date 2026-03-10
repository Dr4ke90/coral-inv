"use client";
import Modal, { useModal } from "@/shared/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import ModalRecipientForm from "./ModalRecipientForm";
import ModalEquipmentForm from "./ModalEquipmentForm";
import Table from "@/shared/components/table/Table";
import { modalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { modalTableConfig } from "../configs/tables/modalTableConfig";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { useHandoverSheets } from "../hooks/useHandoverSheets";
import { generatedId } from "@/shared/utils/generateId";
import { HANDOVER_PREFIX } from "../constants/constants";
import { useUser } from "@/features/users/hooks/useUser";
import { usePreviewList } from "../contexts/PreviewListContext";
import { useEffect } from "react";
import { useCreateHandoverSheet } from "../hooks/useCreateHandoverSheet";

const CreateHandoverModal = () => {
  const { previewList, clearItems } = usePreviewList();
  const { data: handovers } = useHandoverSheets();
  const { mutate: postHandoverSheet } = useCreateHandoverSheet();
  const { closeModal } = useModal();

  const nextId = generatedId(HANDOVER_PREFIX, handovers);
  const { user } = useUser();

  const methods = useForm<HandoverSheet>({
    defaultValues: {
      id: nextId,
      date: new Date(),
      handoverPersonId: user?.employeeId ?? "Necunoscut",
      recipientPersonId: "",
      projectId: "",
      eqList: [],
    },
  });

  useEffect(() => {
    methods.setValue(
      "eqList",
      previewList.map((e) => e.id),
    );
  }, [previewList, methods]);

  useEffect(() => {
    if (handovers) {
      methods.setValue("id", nextId);
    }
  }, [nextId, handovers, methods]);

  const handleReset = () => {
    methods.reset();
    clearItems();
  };

  const onSubmit = (data: HandoverSheet) => {
    postHandoverSheet(data, {
      onSuccess: () => {
        closeModal();
        handleReset();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Modal.Content maxWidth="lg" name="create-handover-sheet">
        <Modal.Header title="Creaza fisa de predare">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body className="flex flex-row gap-2">
          <Box className="flex-1">
            <ModalRecipientForm />
            <hr />
            <ModalEquipmentForm />
          </Box>
          <Box className="flex-1/2">
            <Table
              columns={modalTableColumsConfig}
              data={previewList}
              tableCustomOptions={modalTableConfig}
            />
          </Box>
        </Modal.Body>

        <Modal.Actions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              closeModal();
              handleReset();
            }}
          >
            Anulează
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Salvează
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </FormProvider>
  );
};

export default CreateHandoverModal;
