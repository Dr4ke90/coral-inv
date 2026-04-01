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
import { useHandoverSheets } from "../hooks/useHandoverSheets";
import { generatedId } from "@/utils/generateId";
import { HANDOVER_PREFIX } from "../constants/constants";
import { useUser } from "@/features/users/hooks/useUser";
import { usePreviewList } from "../contexts/PreviewListContext";
import { useEffect } from "react";
import { useCreateHandoverSheet } from "../hooks/useCreateHandoverSheet";
import { HANDOVER_SHEET_INITIAL_STATE } from "../constants/handoverInitialState";
import { generateDocx } from "@/utils/generateDocx";
import { mapHandoverDataForDocx } from "../utils/mapHandoverData";
import { useEmployees } from "@/hooks/useEmployees";
import { useProjects } from "@/hooks/useProjects";
import { useEquipment } from "@/features/equipment-it/hooks/useEquipment";

const CreateHandoverModal = () => {
  const { previewList, clearItems } = usePreviewList();
  const { data: handovers } = useHandoverSheets();
  const { data: employees = [] } = useEmployees();
  const { data: projects = [] } = useProjects();
  const { data: equipments = [] } = useEquipment();
  const { mutate: postHandoverSheet } = useCreateHandoverSheet();
  const { closeModal } = useModal();

  const nextId = generatedId(HANDOVER_PREFIX, handovers);
  const { user } = useUser();

  const methods = useForm<HandoverSheet>({
    defaultValues: {
      ...HANDOVER_SHEET_INITIAL_STATE,
      id: nextId,
      date: new Date(),
      handoverPersonId: user?.employeeId ?? "Necunoscut",
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
    if (data.eqList.length === 0) return;

    const mapedData = mapHandoverDataForDocx(
      data,
      employees,
      projects,
      equipments,
    );

    console.log("mapedData", mapedData);

    postHandoverSheet(data, {
      onSuccess: () => {
        generateDocx(process.env.NEXT_PUBLIC_API_HANDOVER ?? "", mapedData);
        closeModal();
        handleReset();
      },
      onError: (error) => {
        console.log(error);
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
