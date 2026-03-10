"use client";
import Modal, { useModal } from "@/shared/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import ModalResourcesForm from "./ModalResourcesForm";
import Table from "@/shared/components/table/Table";
import { rowSubtableColumnsConfig } from "../configs/columns/rowSubtableColumnsConfig";
import { modalTableConfig } from "../configs/tables/modalTableConfig";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useRequirementData } from "../hooks/useRequirementData";
import { usePostRequirement } from "../hooks/usePostRequirmentSheet";
import { generatedId } from "@/shared/utils/generateId";
import { REQUIRMENTS_PREFIX } from "../constants/constants";
import { useUser } from "@/features/users/hooks/useUser";
import { useForm, FormProvider } from "react-hook-form";
import { Requirement } from "../types/requiment.type";
import { useEffect, useMemo } from "react";
import { ResourceType } from "../types/resource.type";
import { Box, Button } from "@mui/material";
import ReadOnlyInput from "@/shared/components/ui/ReadOnlyInput";
import ControlledTextField from "@/shared/components/ui/ControlledTextField";
import { REQUIREMENT_STATUS_OPTIONS } from "../constants/requirementStatus";

const CreateRequirementModal = () => {
  const { items, clearItems } = useItemsList<ResourceType>();
  const { data: requirments } = useRequirementData();
  const { mutate: postOneRequirementSheet } = usePostRequirement();

  const { closeModal } = useModal();

  const nextId = generatedId(REQUIRMENTS_PREFIX, requirments);
  const { user } = useUser();

  const calculatedTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }, [items]);

  const mainMethods = useForm<Requirement>({
    defaultValues: {
      id: nextId,
      date: new Date(),
      createdBy: user?.employeeId ?? "Necunoscut",
      projectId: "",
      totalCollectedPrice: 0,
      status: REQUIREMENT_STATUS_OPTIONS[0],
      items: [],
    },
  });

  const resourceMethods = useForm<ResourceType>({
    defaultValues: { item: "", quantity: "", unitPrice: "" },
  });

  useEffect(() => {
    mainMethods.setValue("items", items);
    mainMethods.setValue("totalCollectedPrice", calculatedTotal);
  }, [items, calculatedTotal, mainMethods]);

  useEffect(() => {
    if (requirments) {
      mainMethods.setValue("id", nextId);
    }
  }, [nextId, requirments, mainMethods]);

  const handleReset = () => {
    mainMethods.reset();
    clearItems();
  };

  const onSubmit = (data: Requirement) => {
    postOneRequirementSheet(data, {
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
    <Modal.Content maxWidth="lg" name="create-requirement">
      <Modal.Header title="Creaza fisa nou Necesar">
        <FormProvider {...mainMethods}>
          <ModalHeaderForm />
        </FormProvider>
      </Modal.Header>

      <Modal.Body>
        <ControlledTextField control={resourceMethods.control} />
        <Box className="flex flex-row gap-2">
          <FormProvider {...resourceMethods}>
            <ModalResourcesForm />
          </FormProvider>

          <Box className="flex-1 flex flex-col items-center">
            <Table
              columns={rowSubtableColumnsConfig}
              data={items}
              tableCustomOptions={modalTableConfig}
            />
            <ReadOnlyInput value={calculatedTotal} />
          </Box>
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
          onClick={mainMethods.handleSubmit(onSubmit)}
        >
          Salvează
        </Button>
      </Modal.Actions>
    </Modal.Content>
  );
};

export default CreateRequirementModal;
