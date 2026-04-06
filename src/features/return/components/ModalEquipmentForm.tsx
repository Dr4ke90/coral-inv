import { Box, Button } from "@mui/material";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import useSelectedElement from "../hooks/useSelectedElement";
import { useItemsList } from "@/contexts/ItemsListContext";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { EQUIPMENT_INITIAL_STATE } from "../constants/constants";
import { useEquipment } from "@/hooks/useEquipment";
import { HandoverSheet } from "@/types/handoverSheet.type";

const ModalEquipmentForm = () => {
  const { data: equimentList = [] } = useEquipment();

  const {
    control: eqControl,
    handleSubmit,
    reset,
  } = useForm<EquipmentType>({
    defaultValues: EQUIPMENT_INITIAL_STATE,
  });

  const watchedEqValues = useWatch({ control: eqControl });
  const { id } = watchedEqValues;

  const { control: returnControl } = useFormContext<HandoverSheet>();
  const watchedReturnValues = useWatch({ control: returnControl });

  const filteredEquipmentList = useMemo(() => {
    return equimentList.filter(
      (eq) => eq.custodianId === watchedReturnValues.handoverPersonId,
    );
  }, [equimentList, watchedReturnValues]);

  const selectedElement = useSelectedElement(id, filteredEquipmentList);

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
          control={eqControl}
          requiredText="Selectarea unui echipament este obligatorie"
          label="CIT"
          options={filteredEquipmentList}
          optionLabel="id"
        />

        <ReadOnlyInput value={watchedEqValues.type ?? ""} label="Tip" />
        <ReadOnlyInput value={watchedEqValues.model ?? ""} label="Model" />
        <ReadOnlyInput value={watchedEqValues.series ?? ""} label="Serie" />
        <ReadOnlyInput value={watchedEqValues.status ?? ""} label="Stare" />
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
