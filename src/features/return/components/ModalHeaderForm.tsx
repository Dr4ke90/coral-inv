import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useEmployees } from "@/hooks/useEmployees";
import ReadOnlyDate from "@/components/ui/ReadOnlyDate";
import { useMemo } from "react";

const ModalHeaderForm = () => {
  const { control, getValues, watch } = useFormContext();
  const currentId = watch("id");
  const { data: employees } = useEmployees();

  const filteredEmployees = useMemo(() => {
    return employees?.filter((e) => e.id !== "E0000");
  }, [employees]);

  return (
    <Box component="form" sx={{ p: 2 }} className="w-full">
      <Box className="flex gap-10">
        <ControlledAutocomplete
          name="handoverPersonId"
          label="Predat de"
          options={filteredEmployees}
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
