"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { Box, Button } from "@mui/material";
import ModalEquipmentForm from "./ModalEquipmentForm";
import Table from "@/components/table/Table";
import { useModalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { useModalTableConfig } from "../configs/tables/modalTableConfig";
import { Equipment } from "../types/equipment.type";
import { useItemsList } from "@/contexts/ItemsListContext";
import { toast } from "react-toastify";
import { useCreateEquipment } from "../hooks/useCreateEquipment";
import { useDocument } from "@/contexts/DocumentContext";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/features/users/hooks/useUser";
import { EQ_INITIAL_STATE } from "../constants/eqInitialState";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";
import { useUploadInvoicePdf } from "@/hooks/useUploadInvoicePdf";

const AddEquipmentModal = () => {
  const { closeModal } = useModal();
  const { items, clearItems } = useItemsList<Equipment>();
  const { mutate: postEquipment } = useCreateEquipment();
  const modalTableConfig = useModalTableConfig();
  const { clearDocument } = useDocument();
  const modalTableColumnsConfig = useModalTableColumsConfig();
  const { handleUploadInvoice } = useUploadInvoicePdf();
  const { user } = useUser();

  const eqMethods = useForm<Equipment>({
    defaultValues: {
      ...EQ_INITIAL_STATE,
      createdBy: user?.employeeId,
      createdAt: new Date(),
    },
  });

  const { methods: invoiceMethods } = useInvoiceFormContext();

  const handleReset = () => {
    clearItems();
    clearDocument();
    eqMethods.reset();
    invoiceMethods.reset();
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      console.log("Lista de echipamente nu poate fi goala");
      toast.warning("Lista de echipamente nu poate fi goala");
      return;
    }

    const hasEmptySeries = items.some(
      (item) => !item.series || item.series.trim() === "",
    );

    if (hasEmptySeries) {
      console.log("Toate echipamentele trebuie să aibă o serie validă");
      toast.warning("Toate echipamentele trebuie să aibă o serie validă!");
      return;
    }

    postEquipment(items, {
      onSuccess: () => {
        handleUploadInvoice();
        toast.success("Echipamente adaugate cu succes");
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

export default AddEquipmentModal;
