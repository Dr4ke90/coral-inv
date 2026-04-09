"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { Box, Button } from "@mui/material";
import Table from "@/components/table/Table";
import { useModalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { useModalTableConfig } from "../configs/tables/modalTableConfig";
import { useItemsList } from "@/contexts/ItemsListContext";
import { toast } from "react-toastify";
import { useDocument } from "@/contexts/DocumentContext";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/features/users/hooks/useUser";
import { CategoryType } from "../types/category.type";
import { useCreateComponent } from "../hooks/useCreateComponent";
import { CATEGORY_INITIAL_STATE } from "../constants/categoryInitialState";
import { ComponentType } from "../types/component.type";
import ModalComponentForm from "./ModalComponentForm";
import { useUploadInvoicePdf } from "@/hooks/useUploadInvoicePdf";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

const AddComponentsModal = () => {
  //#################### HOOKS ####################
  const { closeModal } = useModal();
  const { items, clearItems } = useItemsList<ComponentType>();
  const { mutate: postComponent } = useCreateComponent();
  const modalTableConfig = useModalTableConfig();
  const { clearDocument } = useDocument();
  const modalTableColumnsConfig = useModalTableColumsConfig();
  const { handleUploadInvoice } = useUploadInvoicePdf();
  const { user } = useUser();

  //#################### FORM METHODS ####################
  const categoryMethods = useForm<CategoryType>({
    defaultValues: {
      ...CATEGORY_INITIAL_STATE,
      createdBy: user?.employeeId,
      createdAt: new Date(),
    },
  });
  const { methods: invoiceMethods } = useInvoiceFormContext();

  //#################### HANDLERS ####################
  const handleReset = () => {
    clearItems();
    clearDocument();
    categoryMethods.reset();
    invoiceMethods.reset();
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      console.log("Lista de echipamente nu poate fi goala");
      toast.warning("Lista de echipamente nu poate fi goala");
      return;
    }

    postComponent(items, {
      onSuccess: () => {
        handleUploadInvoice();
        toast.success("Echipamente adaugate cu succes");
        handleReset();
        closeModal();
      },
      onError: (error) => {
        toast.error("Eroare la salvarea echipamentelor");
        console.log(error);
      },
    });
  };

  //#################### RENDER ####################
  return (
    <FormProvider {...categoryMethods}>
      <Modal.Content maxWidth="lg" name="add-equipment-modal">
        <Modal.Header title="Adauga echipament">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body className="flex flex-row gap-2">
          <Box className="w-[250px]">
            <ModalComponentForm />
          </Box>
          <Box className="flex-1">
            <Table
              columns={modalTableColumnsConfig}
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
              handleReset();
              closeModal();
            }}
          >
            Anulează
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Salvează
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </FormProvider>
  );
};

export default AddComponentsModal;
