import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/shared/components/ui/ReadOnlyInput";
import ControlledAutocomplete from "@/shared/components/ui/ControlledAutocomplete";
import { useEmployees } from "@/hooks/useEmployees";
import ReadOnlyDate from "@/shared/components/ui/ReadOnlyDate";

const ModalHeaderForm = () => {
  const { control, getValues, watch } = useFormContext();
  const currentId = watch("id");
  const { data: employees } = useEmployees();

  return (
    <Box component="form" sx={{ p: 2 }} className="w-full">
      <Box className="flex gap-10">
        <ControlledAutocomplete
          name="handoverPersonId"
          label="Predat de"
          options={employees}
          requiredText="Selectarea unui predator este obligatorie"
          control={control}
          optionLabel="name"
          className="w-full"
        />
        <ReadOnlyInput value={currentId} className="w-full" />

        <ReadOnlyDate value={getValues("date")} className="w-full" />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
