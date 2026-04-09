"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { Box, Button } from "@mui/material";
import ModalEquipmentForm from "./ModalTabletForm";
import Table from "@/components/table/Table";
import { useModalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { useModalTableConfig } from "../configs/tables/modalTableConfig";
import { useItemsList } from "@/contexts/ItemsListContext";
import { toast } from "react-toastify";
import { useDocument } from "@/contexts/DocumentContext";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/features/users/hooks/useUser";
import { TABLET_INITIAL_STATE } from "../constants/tabletInitialState";
import { Tablet } from "../types/tablet.type";
import { useCreateTablet } from "../hooks/useCreateTablet";
import { useUploadInvoicePdf } from "@/hooks/useUploadInvoicePdf";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

const AddTabletsModal = () => {
  const { closeModal } = useModal();
  const { items, clearItems } = useItemsList<Tablet>();
  const { mutate: postTablet } = useCreateTablet();
  const modalTableConfig = useModalTableConfig();
  const { clearDocument } = useDocument();
  const { handleUploadInvoice } = useUploadInvoicePdf();
  const modalTableColumnsConfig = useModalTableColumsConfig();
  const { methods: invoiceMethods } = useInvoiceFormContext();
  const { user } = useUser();

  const eqMethods = useForm<Tablet>({
    defaultValues: {
      ...TABLET_INITIAL_STATE,
      createdBy: user?.employeeId,
      createdAt: new Date(),
    },
  });

  const handleReset = () => {
    clearItems();
    clearDocument();
    eqMethods.reset(TABLET_INITIAL_STATE);
    invoiceMethods.reset();
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      console.log("Lista de echipamente nu poate fi goala");
      toast.warning("Lista de echipamente nu poate fi goala");
      return;
    }

    const hasEmptySeries = items.some(
      (item) => !item.imei || item.imei.trim() === "",
    );

    if (hasEmptySeries) {
      console.log("Toate echipamentele trebuie să aibă o serie validă");
      toast.warning("Toate echipamentele trebuie să aibă o serie validă!");
      return;
    }

    postTablet(items, {
      onSuccess: () => {
        toast.success("Echipamente adaugate cu succes");
        handleUploadInvoice();
        handleReset();
        closeModal();
      },
      onError: (error) => {
        toast.error("Eroare la salvarea echipamentelor");
        console.log(error);
      },
    });
  };

  return (
    <FormProvider {...eqMethods}>
      <Modal.Content maxWidth="lg" name="add-tablets-modal">
        <Modal.Header title="Adauga noile tablete">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body className="flex flex-row gap-2">
          <Box className="w-[250px]">
            <ModalEquipmentForm />
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

export default AddTabletsModal;
