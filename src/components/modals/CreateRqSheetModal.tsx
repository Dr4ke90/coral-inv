"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import ModalResourcesForm from "../forms/ResourcesForm";
import Table from "@/components/ui/table/Table";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useRequirementData } from "../../hooks/requirement/useRequirementData";
import { usePostRequirement } from "../../hooks/requirement/usePostRequirmentSheet";
import {
  REQUIREMENT_STATUS_OPTIONS,
  REQUIRMENTS_PREFIX,
} from "../../constants/requirementConstants";
import { useForm, FormProvider } from "react-hook-form";
import { Requirement } from "../../types/requiment.type";
import { useEffect, useMemo } from "react";
import { ResourceType } from "../../types/resource.type";
import { Box, Button } from "@mui/material";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ControlledTextField from "@/components/ui/ControlledTextField";
import { REQUIREMENT_SHEET_INITIAL_STATE } from "../../states/requirementInitialState";
import { RESOURCES_INITIAL_STATE } from "../../states/resourcesInitialState";
import { generateDocx } from "@/utils/generateDocx";
import { mapRequirementDataForDocx } from "../../utils/mapRequirementData";
import { useProjects } from "@/hooks/projects/useProjects";
import { useUser } from "@/contexts/AuthContext";
import { useUsers } from "@/hooks/users/useUsers";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import { modalTableConfig } from "@/configs/tables/generalConfigs/modalTableConfig";
import ModalHeaderForm from "../forms/ModalHeaderForm";
import { requirementModalColumnsConfig } from "@/configs/columns/modal/requirementColumnsConfig";

const CreateRequirementModal = () => {
  const { items, clearItems } = useItemsList<ResourceType>();
  const { data: requirments } = useRequirementData();
  const { data: users = [] } = useUsers();
  const { data: projects = [] } = useProjects();
  const { mutate: postOneRequirementSheet } = usePostRequirement();

  const { closeModal } = useModal();

  const nextId = docsIdGenerator(REQUIRMENTS_PREFIX, requirments);
  const { user } = useUser();

  const calculatedTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }, [items]);

  const mainMethods = useForm<Requirement>({
    defaultValues: {
      ...REQUIREMENT_SHEET_INITIAL_STATE,
      id: nextId,
      date: new Date(),
      createdBy: user?.id!,
      createdAt: new Date(),
      status: REQUIREMENT_STATUS_OPTIONS[0],
    },
  });

  const resourceMethods = useForm<ResourceType>({
    defaultValues: { ...RESOURCES_INITIAL_STATE, um: "BUC", currency: "RON" },
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
    if (data.items.length === 0) return;

    const mappedData = mapRequirementDataForDocx(data, users, projects);

    postOneRequirementSheet(data, {
      onSuccess: () => {
        generateDocx(
          process.env.NEXT_PUBLIC_API_FILES_REQUIREMENT!,
          mappedData,
        );
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
        <ControlledTextField
          control={resourceMethods.control}
          name="item"
          label="Denumire resursa"
          requiredText="Numele resursei este obligatoriu"
        />
        <Box className="flex flex-row gap-2">
          <FormProvider {...resourceMethods}>
            <ModalResourcesForm />
          </FormProvider>

          <Box className="flex-1 flex flex-col items-center">
            <Table
              columns={requirementModalColumnsConfig()}
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
