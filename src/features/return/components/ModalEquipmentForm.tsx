import { Box, Button } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import useSelectedElement from "../hooks/useSelectedElement";
import { useItemsList } from "@/contexts/ItemsListContext";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { EQUIPMENT_INITIAL_STATE } from "../constants/constants";

const ModalEquipmentForm = () => {
  const [equimentList, setEqList] = useState<EquipmentType[]>([
    {
      id: "CIT002",
      type: "Boxe",
      model: "CORAL",
      series: "N/A",
      status: "Nou",
    },
    {
      id: "CIT004",
      type: "Imprimanta",
      model: "Brother",
      series: "N/A",
      status: "Nou",
    },
  ]);

  const { control, handleSubmit, reset } = useFormContext<EquipmentType>();

  const watchedValues = useWatch({ control });
  const { id } = watchedValues;

  const selectedElement = useSelectedElement(id, equimentList);

  useEffect(() => {
    if (!selectedElement) return;

    reset({
      ...selectedElement,
    });
  }, [selectedElement, reset]);

  const { addItem } = useItemsList<EquipmentType>();

  const onSubmit = (data: EquipmentType) => {
    if (!data.id) return;

    addItem(data);
    reset(EQUIPMENT_INITIAL_STATE);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="p-2"
    >
      <Box className="flex flex-col">
        <ControlledAutocomplete
          name="id"
          control={control}
          requiredText="Selectarea unui echipament este obligatorie"
          label="CIT"
          options={equimentList}
          optionLabel="id"
        />

        <ReadOnlyInput value={watchedValues.type ?? ""} label="Tip" />
        <ReadOnlyInput value={watchedValues.model ?? ""} label="Model" />
        <ReadOnlyInput value={watchedValues.series ?? ""} label="Serie" />
        <ReadOnlyInput value={watchedValues.status ?? ""} label="Stare" />
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
