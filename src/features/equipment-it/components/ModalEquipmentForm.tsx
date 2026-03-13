import { Box, Button, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { EQUIPMENT_INITIAL_STATE } from "../constants/equipmentInitialState";
import { useItemsList } from "@/contexts/ItemsListContext";
import { Equipment } from "../types/equipment.type";
import { IT_EQUIPMENT_TYPES } from "../constants/equipmentTypes";
import ControlledTextField from "@/shared/components/ui/ControlledTextField";
import ControlledStringAutocomplete from "@/shared/components/ui/ControlledStringAutocomplete";
import useIdGenerator from "../hooks/useIdGenerator";
import { EQUIPMENT_PREFIX } from "../constants/constants";
import { useEquipment } from "../hooks/useEquipment";
import { useUser } from "@/features/users/hooks/useUser";
import { useState } from "react";
import ControlledNumberField from "@/shared/components/ui/ControlledNumberField";

const ModalEquipmentForm = () => {
  const { control, handleSubmit, reset, getValues } = useFormContext();
  const { user } = useUser();
  const { items, addItem } = useItemsList<Partial<Equipment>>();
  const { data: equipmentIt = [] } = useEquipment();
  const generateId = useIdGenerator();

  const [quantity, setQuantity] = useState<number>(0);

  const handleReset = () => {
    const currentRequirementId = getValues("requirementId");
    const currentInvoice = getValues("invoice");

    reset({
      ...EQUIPMENT_INITIAL_STATE,
      requirementId: currentRequirementId,
      invoice: currentInvoice,
    });
  };

  const onSubmit = (data: Partial<Equipment>) => {
    const currentItems = [...equipmentIt, ...items];

    if (quantity > 0) {
      for (let index = 0; index < quantity; index++) {
        const nextId = generateId(EQUIPMENT_PREFIX, currentItems);

        const newItem = {
          ...data,
          id: nextId,
          createdBy: user?.employeeId,
        };

        currentItems.push(newItem);

        addItem(newItem);
      }
    } else {
      const nextId = generateId(EQUIPMENT_PREFIX, currentItems);
      addItem({ ...data, id: nextId });
    }

    handleReset();
    setQuantity(0);
  };
  return (
    <Box component="form" autoComplete="off" className="p-2">
      <Box className="flex flex-col gap-2">
        <ControlledStringAutocomplete
          name="type"
          control={control}
          label="Tip"
          options={IT_EQUIPMENT_TYPES}
          requiredText="Selectarea unui tip este obligatorie"
          className="w-full"
        />

        <ControlledTextField
          name="model"
          control={control}
          required={true}
          requiredText=""
          label="Model"
          className="w-full"
        />

        <ControlledTextField
          name="config"
          control={control}
          required={true}
          requiredText=""
          label="Configuratie"
          className="w-full"
        />

        <ControlledNumberField
          name="price"
          control={control}
          required={true}
          requiredText=""
          label="Pret"
          className="w-full"
        />

        <TextField
          value={quantity ?? 0}
          size="small"
          label="Cantitate"
          onChange={(e) => {
            const onlyNumbers = e.target.value.replaceAll(/\D/g, "");
            setQuantity(onlyNumbers === "" ? 0 : Number(onlyNumbers));
          }}
          autoComplete="off"
          sx={{ margin: "2px 0 2px 0", width: "30%" }}
        />
      </Box>
      <Box className="flex justify-center mt-3">
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          Adauga
        </Button>
      </Box>
    </Box>
  );
};

export default ModalEquipmentForm;
