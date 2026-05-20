import { Box, TextField } from "@mui/material";
import ControlledTextField from "../ui/ControlledTextField";
import ControlledNumberField from "../ui/ControlledNumberField";
import ControlledStringAutocomplete from "../ui/ControlledStringAutocomplete";
import { EQUIPMENT_TYPES } from "@/constants/equipmentTypes";
import { useEquipmentFormContext } from "@/contexts/EquipmentFormContext";

export const EquipmentForm = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  const { methods } = useEquipmentFormContext();
  const { control } = methods;

  return (
    <Box className="flex flex-col gap-2">
      <ControlledStringAutocomplete
        name="type"
        control={control}
        label="Tip"
        options={EQUIPMENT_TYPES}
        requiredText="Selectarea unui tip este obligatorie"
        className="w-full"
      />

      <ControlledTextField
        name="brand"
        control={control}
        required={true}
        requiredText=""
        label="Brand"
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
        required={false}
        requiredText=""
        label="Configuratie"
        className="w-full"
      />

      <Box className="flex flex gap-2">
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
          sx={{ margin: "2px 0 2px 0" }}
        />
      </Box>
    </Box>
  );
};
