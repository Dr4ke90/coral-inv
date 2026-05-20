import { Box, Button } from "@mui/material";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useEquipment } from "../../hooks/it_equipment/useEquipment";
import { useState } from "react";
import DocumentForm from "@/components/forms/DocumentForm";
import { EquipmentType } from "../../types/equipment.type";
import { EquipmentForm } from "@/components/forms/EquipmentForm";
import { useEquipmentFormContext } from "@/contexts/EquipmentFormContext";
import { useEquipmentFactory } from "@/factories/equipmentFactory";

const ModalEntriesSidebar = () => {
  const { methods } = useEquipmentFormContext();
  const { handleSubmit, reset, getValues } = methods;

  const { items, addItemsBatch } = useItemsList<Partial<EquipmentType>>();
  const { data: equipmentIt = [] } = useEquipment();

  const [quantity, setQuantity] = useState<number>(0);

  const generateNewEquipment = useEquipmentFactory();

  const handleReset = () => {
    reset();
    setQuantity(0);
  };

  const handleAddEquipment = () => {
    const currentItemsPool = [...equipmentIt, ...items];
    const numToAdd = quantity > 0 ? quantity : 1;

    const newBatch: Partial<EquipmentType>[] = [];
    let updatedPool = [...currentItemsPool];

    for (let i = 0; i < numToAdd; i++) {
      const newItem = generateNewEquipment(getValues(), updatedPool);
      newBatch.push(newItem);
      updatedPool.push(newItem);
    }

    addItemsBatch(newBatch);
    handleReset();
  };

  return (
    <Box component="form" autoComplete="off" className="p-2">
      <Box className="flex flex-col gap-2">
        <DocumentForm />

        <hr />

        <EquipmentForm quantity={quantity} setQuantity={setQuantity} />
      </Box>
      <Box className="flex justify-center mt-3">
        <Button variant="outlined" onClick={handleSubmit(handleAddEquipment)}>
          Adauga
        </Button>
      </Box>
    </Box>
  );
};

export default ModalEntriesSidebar;
