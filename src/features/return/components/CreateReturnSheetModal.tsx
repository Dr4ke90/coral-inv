"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import ModalRecipientForm from "./ModalRecipientForm";
import ModalEquipmentForm from "./ModalEquipmentForm";
import Table from "@/components/table/Table";
import { modalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { modalTableConfig } from "../configs/tables/modalTableConfig";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { generatedId } from "@/utils/generateId";
import {
  EQUIPMENT_INITIAL_STATE,
  RETURN_SHEET_INITIAL_STATE,
  RETURN_PREFIX,
} from "../constants/constants";
import { useUser } from "@/features/users/hooks/useUser";
import { useEffect } from "react";
import { useCreateReturnSheet } from "../hooks/useCreateReturnSheet";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import { useEquipment } from "@/hooks/useEquipment";
import { mapReturnDataForDocx } from "../utils/mapReturnData";
import { generateDocx } from "@/utils/generateDocx";
import { useReturnSheets } from "@/hooks/useReturnSheets";

const CreateReturnModal = () => {
  const { items, clearItems } = useItemsList<EquipmentType>();
  const { data: returns } = useReturnSheets();
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();
  const { data: equipments } = useEquipment();
  const { mutate: postReturnSheet } = useCreateReturnSheet();
  const { closeModal } = useModal();

  const nextId = generatedId(RETURN_PREFIX, returns);
  const { user } = useUser();

  const handoverSheetMethods = useForm<HandoverSheet>({
    defaultValues: {
      ...RETURN_SHEET_INITIAL_STATE,
      id: nextId,
      date: new Date(),
      handoverPersonId: user?.employeeId ?? "Necunoscut",
    },
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

    const mappedData = mapReturnDataForDocx(
      data,
      employees!,
      projects!,
      equipments!,
    );

    postReturnSheet(data, {
      onSuccess: () => {
        generateDocx(process.env.NEXT_PUBLIC_API_FILES_RETURN!, mappedData);
        closeModal();
        handleReset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <FormProvider {...handoverSheetMethods}>
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
    </FormProvider>
  );
};

export default CreateReturnModal;
