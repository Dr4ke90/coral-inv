import { Box, Button } from "@mui/material";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import useSelectedElement from "@/hooks/handovers/useSelectedElement";
import { useItemsList } from "@/contexts/ItemsListContext";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { EQUIPMENT_INITIAL_STATE } from "@/states/equipmentInitialState";
import { EquipmentType } from "@/types/equipment.type";
import { usePathname } from "next/navigation";

const ReadOnlyEquipmentForm = () => {
  const { data: equimentList = [] } = useEquipment();
  const { addItem } = useItemsList<EquipmentType>();
  const location = usePathname();

  const {
    control: equipmentFormControl,
    handleSubmit: handleSubmitEquipment,
    reset: resetEquipment,
  } = useForm<EquipmentType>({
    defaultValues: EQUIPMENT_INITIAL_STATE,
  });

  const watchedEqValues = useWatch({ control: equipmentFormControl });
  const { id } = watchedEqValues;

  const { control: handoverFormControl } = useFormContext<HandoverSheet>();
  const watchedHandoverValues = useWatch({ control: handoverFormControl });

  const filteredEquipmentList = useMemo(() => {
    return equimentList.filter(
      (eq) => eq.custodianId === watchedHandoverValues.handoverPersonId,
    );
  }, [equimentList, watchedHandoverValues]);

  const equipmentList = useMemo(() => {
    return location === "/retur" ? filteredEquipmentList : equimentList;
  }, [location, filteredEquipmentList, equimentList]);

  const selectedElement = useSelectedElement(id, equipmentList);

  useEffect(() => {
    if (!selectedElement) return;

    resetEquipment({
      ...selectedElement,
    });
  }, [selectedElement, resetEquipment]);

  const onSubmit = (data: EquipmentType) => {
    if (!data.id) return;

    addItem(data);
    resetEquipment(EQUIPMENT_INITIAL_STATE);
  };

  return (
    <Box component="form" autoComplete="off" className="p-2">
      <Box className="flex flex-col">
        <ControlledAutocomplete
          name="id"
          control={equipmentFormControl}
          requiredText="Selectarea unui echipament este obligatorie"
          label="CIT:"
          options={location === "/retur" ? filteredEquipmentList : equimentList}
          optionLabel="id"
        />

        <ReadOnlyInput value={watchedEqValues.type ?? ""} label="Tip:" />
        <ReadOnlyInput value={watchedEqValues.model ?? ""} label="Model:" />
        <ReadOnlyInput value={watchedEqValues.series ?? ""} label="Serie:" />
        <ReadOnlyInput value={watchedEqValues.status ?? ""} label="Stare:" />
      </Box>
      <Box className="flex justify-center mt-3">
        <Button variant="outlined" onClick={handleSubmitEquipment(onSubmit)}>
          Adauga
        </Button>
      </Box>
    </Box>
  );
};

export default ReadOnlyEquipmentForm;
