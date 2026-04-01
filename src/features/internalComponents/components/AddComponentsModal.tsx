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
import { uploadPdfInvoice } from "@/shared/api/uploadPdfInvoice";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/features/users/hooks/useUser";
import { CategoryType } from "../types/category.type";
import { useCreateComponent } from "../hooks/useCreateComponent";
import { CATEGORY_INITIAL_STATE } from "../constants/categoryInitialState";
import { ComponentType } from "../types/component.type";
import ModalComponentForm from "./ModalComponentForm";

const AddComponentsModal = () => {
  const { closeModal } = useModal();
  const { items, clearItems } = useItemsList<ComponentType>();
  const { mutate: postComponent } = useCreateComponent();
  const modalTableConfig = useModalTableConfig();
  const { document, clearDocument } = useDocument();
  const modalTableColumnsConfig = useModalTableColumsConfig();

  const { user } = useUser();

  const eqMethods = useForm<CategoryType>({
    defaultValues: {
      ...CATEGORY_INITIAL_STATE,
      createdBy: user?.employeeId,
      createdAt: new Date(),
    },
  });

  const handleReset = () => {
    clearItems();
    clearDocument();
    eqMethods.reset();
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      console.log("Lista de echipamente nu poate fi goala");
      toast.warning("Lista de echipamente nu poate fi goala");
      return;
    }

    const hasEmptyRefInvoice = items.some(
      (item) => !item.refInvoice?.sn || item.refInvoice?.sn.trim() === "",
    );

    console.log(hasEmptyRefInvoice);

    if (!hasEmptyRefInvoice) {
      console.log("Toate echipamentele trebuie să aibă o factura validă");
      toast.warning("Toate echipamentele trebuie să aibă o factura validă!");
      return;
    }

    const handleUploadInvoice = async () => {
      if (!document) return null;

      const invoiceName = items[0]?.refInvoice?.sn;
      const dateValue = items[0]?.refInvoice?.date;

      const year = dateValue
        ? new Date(dateValue).getFullYear().toString()
        : new Date().getFullYear().toString();

      let fileToUpload: File;
      if (invoiceName && document instanceof Blob) {
        fileToUpload = new File([document], `${invoiceName}.pdf`, {
          type: document.type || "application/pdf",
        });
      } else {
        fileToUpload = document;
      }

      await toast.promise(uploadPdfInvoice(fileToUpload, year), {
        pending: "Se salvează datele și factura...",
        success: "Date și factură încărcate cu succes! 👌",
        error: "Eroare la salvare! 🤯",
      });
    };

    console.log(items);

    postComponent(items, {
      onSuccess: () => {
        toast.success("Echipamente adaugate cu succes");
        handleUploadInvoice();
        handleReset();
        closeModal();
      },
      onError: (error) => {
        console.log(items);
        toast.error("Eroare la salvarea echipamentelor");
        console.log(error);
      },
    });
  };

  return (
    <FormProvider {...eqMethods}>
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
