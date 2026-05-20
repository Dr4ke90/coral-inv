"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import Table from "@/components/ui/table/Table";
import { handoverModalTableColumsConfig } from "../../configs/columns/modal/handoverModalColumnsConfig";
import { modalTableConfig } from "../../configs/tables/generalConfigs/modalTableConfig";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import {
  HANDOVER_PREFIX,
  RETURN_PREFIX,
} from "../../constants/handoverConstants";
import { useEffect, useMemo } from "react";
import { useCreateReturnSheet } from "../../hooks/returns/useCreateReturnSheet";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useProjects } from "@/hooks/projects/useProjects";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { mapReturnDataForDocx } from "../../utils/mapReturnData";
import { generateDocx } from "@/utils/generateDocx";
import { useReturnSheets } from "@/hooks/returns/useReturnSheets";
import { useUser } from "@/contexts/AuthContext";
import { useUsers } from "@/hooks/users/useUsers";
import HandoverEquipmentForm from "../forms/ReadOnlyEquipmentForm";
import HandoverRecipientForm from "../forms/HandoverRecipientForm";
import HandoverModalHeaderForm from "../forms/ModalHeaderForm";
import { EquipmentType } from "@/types/equipment.type";
import { HANDOVER_SHEET_INITIAL_STATE } from "@/states/handoverInitialState";
import { usePathname } from "next/navigation";
import { useHandoverSheets } from "@/hooks/handovers/useHandoverSheets";
import { useCreateHandoverSheet } from "@/hooks/handovers/useCreateHandoverSheet";

const CreateHandoverSheetModal = () => {
  const { items, clearItems } = useItemsList<EquipmentType>();
  const { data: returns } = useReturnSheets();
  const { data: handovers } = useHandoverSheets();
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();
  const { data: users } = useUsers();
  const { data: equipments } = useEquipment();
  const { mutate: postReturnSheet } = useCreateReturnSheet();
  const { mutate: postHandoverSheet } = useCreateHandoverSheet();
  const { closeModal } = useModal();
  const location = usePathname();
  const { user } = useUser();

  const prefix = useMemo(() => {
    switch (location) {
      case "/predare":
        return HANDOVER_PREFIX;
      case "/retur":
        return RETURN_PREFIX;
      default:
        return "";
    }
  }, [location]);

  const data = useMemo(() => {
    switch (location) {
      case "/predare":
        return handovers;
      case "/retur":
        return returns;
      default:
        return [];
    }
  }, [location]);

  const nextId = useMemo(() => docsIdGenerator(prefix, data), [data, prefix]);

  const handoverFormMethods = useForm<HandoverSheet>({
    defaultValues: {
      ...HANDOVER_SHEET_INITIAL_STATE,
      date: new Date(),
      handoverPersonId: location === "/predare" ? user?.id : "",
    },
  });

  useEffect(() => {
    handoverFormMethods.setValue(
      "eqList",
      items.map((e) => e.id),
    );
  }, [items, handoverFormMethods]);

  useEffect(() => {
    handoverFormMethods.setValue("id", nextId);
  }, [nextId, handoverFormMethods]);

  const handleReset = () => {
    handoverFormMethods.reset();
    clearItems();
  };

  const apiUrl = useMemo(
    () =>
      location === "/predare"
        ? process.env.NEXT_PUBLIC_API_FILES_HANDOVER!
        : process.env.NEXT_PUBLIC_API_FILES_RETURN!,
    [location],
  );

  const postMutateFn = useMemo(() => {
    switch (location) {
      case "/predare":
        return postHandoverSheet;
      case "/retur":
        return postReturnSheet;
      default:
        return () => {};
    }
  }, [location]);

  const onSubmit = (data: HandoverSheet) => {
    if (data.eqList.length === 0) return;

    const mappedData = mapReturnDataForDocx(
      data,
      users!,
      employees!,
      projects!,
      equipments!,
    );

    postMutateFn(data, {
      onSuccess: () => {
        generateDocx(apiUrl, mappedData);
        closeModal();
        handleReset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const modalTitle = useMemo(() => {
    switch (location) {
      case "/predare":
        return "Creaza fisa de predare";
      case "/retur":
        return "Creaza fisa de retur";
      default:
        return "";
    }
  }, [location]);

  return (
    <FormProvider {...handoverFormMethods}>
      <Modal.Content maxWidth="lg" name="create-handover-sheet">
        <Modal.Header title={modalTitle}>
          <HandoverModalHeaderForm />
        </Modal.Header>

        <Modal.Body className="flex flex-row gap-2">
          <Box className="flex-1">
            <HandoverRecipientForm />
            <hr />
            <HandoverEquipmentForm />
          </Box>
          <Box className="flex-1/2">
            <Table
              columns={handoverModalTableColumsConfig}
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
            onClick={handoverFormMethods.handleSubmit(onSubmit)}
          >
            Salvează
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </FormProvider>
  );
};

export default CreateHandoverSheetModal;
