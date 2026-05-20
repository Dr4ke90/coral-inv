"use client";
import Modal, { useModal } from "@/components/ui/Modal";
import { Box, Button } from "@mui/material";
import Table from "@/components/ui/table/Table";
import { useModalTableColumsConfig } from "../../configs/columns/modal/modalTableColumnsConfig";
import { useModalTableConfig } from "../../configs/tables/entriesTable/modalTableConfig";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useFile } from "@/contexts/FileContext";
import { EquipmentType } from "@/types/equipment.type";
import { useDocumentFormContext } from "@/contexts/DocumentFormContext";
import EntriesModalSidebar from "../layout/ModalEntriesSidebar";
import { checkEmptyItems } from "../../utils/checkItemsLength";
import { checkEmptySeries } from "../../utils/checkSeriesByType";
import { useCreateEntry } from "../../hooks/entries/useCreateEntry";
import { useEntryFactory } from "@/factories/entryFactory";
import { toast } from "react-toastify";
import ModalHeaderForm from "../forms/ModalHeaderForm";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import { useAllEntries } from "@/hooks/entries/useAllEntries";
import { ENTRY_PREFIX } from "@/constants/entriesConstants";
import { useEffect, useMemo } from "react";
import { FormProvider } from "react-hook-form";

const CreateEntriesModal = () => {
  const { items, clearItems } = useItemsList<EquipmentType>();
  const { data: entries } = useAllEntries();
  const { mutate: postEntry } = useCreateEntry();

  const { closeModal } = useModal();
  const { clearFileContext } = useFile();

  const nextId = useMemo(
    () => docsIdGenerator(ENTRY_PREFIX, entries),
    [entries],
  );

  const { methods: invoiceMethods } = useDocumentFormContext();

  useEffect(() => {
    invoiceMethods.setValue("id", nextId);
  }, [nextId]);

  const modalTableConfig = useModalTableConfig();
  const modalTableColumnsConfig = useModalTableColumsConfig();
  const generateFormData = useEntryFactory();

  const handleReset = () => {
    clearItems();
    clearFileContext();
  };

  const handleSubmit = async () => {
    if (checkEmptyItems(items)) return;

    if (checkEmptySeries(items)) return;

    const currentFormValues = invoiceMethods.getValues();
    const formData = generateFormData(currentFormValues);

    postEntry(formData, {
      onSuccess: () => {
        toast.success("Factura a fost adaugata cu succes!");
        handleReset();
        closeModal();
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.message);
      },
    });
  };

  return (
    <FormProvider {...invoiceMethods}>
      <Modal.Content maxWidth="xl" name="create-entry-modal">
        <Modal.Header title="Adaugă o intrare nouă">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body className="flex flex-row gap-2">
          <Box className="w-[250px]">
            <EntriesModalSidebar />
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

export default CreateEntriesModal;
