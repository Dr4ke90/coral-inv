"use client";
import Modal, { useModal } from "@/shared/components/ui/Modal";
import ModalHeaderForm from "./ModalHeaderForm";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import ModalEquipmentForm from "./ModalEquipmentForm";
import Table from "@/shared/components/table/Table";
import { modalTableColumsConfig } from "../configs/columns/modalTableColumnsConfig";
import { useModalTableConfig } from "../configs/tables/modalTableConfig";
import { EQUIPMENT_INITIAL_STATE } from "../constants/equipmentInitialState";
import { Equipment } from "../types/equipment.type";
import { useItemsList } from "@/contexts/ItemsListContext";
import { toast } from "react-toastify";
import { useCreateEquipment } from "../hooks/useCreateEquipment";

const AddEquipmentModal = () => {
  const { closeModal } = useModal();
  const { items } = useItemsList<Equipment>();
  const { mutate: postEquipment } = useCreateEquipment();
  const modalTableConfig = useModalTableConfig();

  const methods = useForm<Equipment>({
    defaultValues: {
      ...EQUIPMENT_INITIAL_STATE,
    },
  });

  const handleReset = () => {
    methods.reset();
    closeModal();
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      console.log("Lista de echipamente nu poate fi goala");
      toast.warning("Lista de echipamente nu poate fi goala");
    }

    postEquipment(items, {
      onSuccess: () => {
        handleReset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Modal.Content maxWidth="lg" name="add-equipment-modal">
        <Modal.Header title="Adauga echipament">
          <ModalHeaderForm />
        </Modal.Header>

        <Modal.Body className="flex flex-row gap-2">
          <Box className="flex-1">
            <ModalEquipmentForm />
          </Box>
          <Box className="flex-1/2">
            <Table
              columns={modalTableColumsConfig}
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
