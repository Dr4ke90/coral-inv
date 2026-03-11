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
import { useReturnSheets } from "../hooks/useReturnSheets";
import { generatedId } from "@/shared/utils/generateId";
import {
  EQUIPMENT_INITIAL_STATE,
  HANDOVER_SHEET_INITIAL_STATE,
  RETURN_PREFIX,
} from "../constants/constants";
import { useUser } from "@/features/users/hooks/useUser";
import { useEffect } from "react";
import { useCreateReturnSheet } from "../hooks/useCreateReturnSheet";
import { useItemsList } from "@/contexts/ItemsListContext";

const CreateReturnModal = () => {
  const { items, clearItems } = useItemsList<EquipmentType>();
  const { data: returns } = useReturnSheets();
  const { mutate: postHandoverSheet } = useCreateReturnSheet();
  const { closeModal } = useModal();

  const nextId = generatedId(RETURN_PREFIX, returns);
  const { user } = useUser();

  const handoverSheetMethods = useForm<HandoverSheet>({
    defaultValues: {
      ...HANDOVER_SHEET_INITIAL_STATE,
      id: nextId,
      date: new Date(),
      handoverPersonId: user?.employeeId ?? "Necunoscut",
    },
  });

  const equipmentFormMethods = useForm<EquipmentType>({
    defaultValues: EQUIPMENT_INITIAL_STATE,
  });

  useEffect(() => {
    handoverSheetMethods.setValue(
      "eqList",
      items.map((e) => e.id),
    );
  }, [items, handoverSheetMethods]);

  useEffect(() => {
    if (returns) {
      handoverSheetMethods.setValue("id", nextId);
    }
  }, [nextId, returns, handoverSheetMethods]);

  const handleReset = () => {
    handoverSheetMethods.reset();
    clearItems();
  };

  const onSubmit = (data: HandoverSheet) => {
    if (data.eqList.length === 0) return;
    postHandoverSheet(data, {
      onSuccess: () => {
        closeModal();
        handleReset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Modal.Content maxWidth="lg" name="create-handover-sheet">
      <Modal.Header title="Creaza fisa de predare">
        <FormProvider {...handoverSheetMethods}>
          <ModalHeaderForm />
        </FormProvider>
      </Modal.Header>

      <Modal.Body className="flex flex-row gap-2">
        <Box className="flex-1">
          <FormProvider {...handoverSheetMethods}>
            <ModalRecipientForm />
          </FormProvider>
          <hr />
          <FormProvider {...equipmentFormMethods}>
            <ModalEquipmentForm />
          </FormProvider>
        </Box>
        <Box className="flex-1/2">
          <Table
            columns={modalTableColumsConfig}
            data={items}
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
          onClick={handoverSheetMethods.handleSubmit(onSubmit)}
        >
          Salvează
        </Button>
      </Modal.Actions>
    </Modal.Content>
  );
};

export default CreateReturnModal;
