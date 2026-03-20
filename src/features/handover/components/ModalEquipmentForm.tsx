import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useSelectedElement from "../hooks/useSelectedElement";
import { usePreviewList } from "../contexts/PreviewListContext";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { EQUIPMENT_INITIAL_STATE } from "../constants/equipmentInitialState";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";

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

  const { control, handleSubmit, reset, watch } = useForm<EquipmentType>({
    defaultValues: EQUIPMENT_INITIAL_STATE,
  });

  const watchedValues = watch();
  const { id } = watchedValues;

  const selectedElement = useSelectedElement(id, equimentList);

  useEffect(() => {
    if (selectedElement) {
      reset({ ...selectedElement });
    } else {
      reset(EQUIPMENT_INITIAL_STATE);
    }
  }, [selectedElement]);

  const { addItem } = usePreviewList();

  const onSubmit = (data: EquipmentType) => {
    if (!data.id) return;

    addItem(data);
    reset(EQUIPMENT_INITIAL_STATE);
  };

  return (
    <Box component="form" autoComplete="off" className="p-2">
      <Box className="flex flex-col gap-2">
        <ControlledAutocomplete
          name="id"
          control={control}
          label="CIT"
          options={equimentList}
          optionLabel="id"
          requiredText="Selectarea unui proiect este obligatorie"
          className="w-full"
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
