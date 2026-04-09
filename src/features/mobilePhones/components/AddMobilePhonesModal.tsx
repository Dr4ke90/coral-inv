"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { Box, Button } from "@mui/material";
import ModalEquipmentForm from "./ModalMobilePhoneForm";
import Table from "@/components/table/Table";
import { useModalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { useModalTableConfig } from "../configs/tables/modalTableConfig";
import { useItemsList } from "@/contexts/ItemsListContext";
import { toast } from "react-toastify";
import { useDocument } from "@/contexts/DocumentContext";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/features/users/hooks/useUser";
import { MobilePhone } from "../types/phones.type";
import { PHONES_INITIAL_STATE } from "../constants/phonesInitialState";
import { useCreateMobilePhone } from "../hooks/useCreateMobilePhone";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";
import { useUploadInvoicePdf } from "@/hooks/useUploadInvoicePdf";

const AddMobilePhonesModal = () => {
  const { closeModal } = useModal();
  const { items, clearItems } = useItemsList<MobilePhone>();
  const { mutate: postMobilePhone } = useCreateMobilePhone();
  const modalTableConfig = useModalTableConfig();
  const { clearDocument } = useDocument();
  const modalTableColumnsConfig = useModalTableColumsConfig();
  const { handleUploadInvoice } = useUploadInvoicePdf();
  const { user } = useUser();

  const eqMethods = useForm<MobilePhone>({
    defaultValues: {
      ...PHONES_INITIAL_STATE,
      createdBy: user?.employeeId,
      createdAt: new Date(),
    },
  });

  const { methods: invoiceMethods } = useInvoiceFormContext();

  const handleReset = () => {
    clearItems();
    clearDocument();
    eqMethods.reset(PHONES_INITIAL_STATE);
    invoiceMethods.reset();
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      console.log("Lista de telefoane nu poate fi goala");
      toast.warning("Lista de telefoane nu poate fi goala");
      return;
    }

    const hasEmptySeries = items.some(
      (item) => !item.imei || item.imei.trim() === "",
    );

    if (hasEmptySeries) {
      console.log("Toate telefoanele trebuie să aibă o serie validă");
      toast.warning("Toate echipamentele trebuie să aibă o serie validă!");
      return;
    }

    postMobilePhone(items, {
      onSuccess: () => {
        handleUploadInvoice();
        toast.success("Telefoanele au fost adaugate cu succes");
        handleReset();
        closeModal();
      },
      onError: (error) => {
        console.log(items);
        toast.error("Eroare la salvarea telefoanelor");
        console.log(error);
      },
    });
  };

  return (
    <FormProvider {...eqMethods}>
      <Modal.Content maxWidth="lg" name="add-mobilePhones-modal">
        <Modal.Header title="Adauga telefoane">
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

export default AddMobilePhonesModal;
