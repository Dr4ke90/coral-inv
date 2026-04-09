import { Box } from "@mui/material";
import { useUser } from "@/features/users/hooks/useUser";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ReadOnlyDate from "@/components/ui/ReadOnlyDate";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useRequirementData } from "@/features/requirement";
import { useFormContext } from "react-hook-form";

const ModalHeaderForm = () => {
  const { control, watch } = useFormContext();
  const { data: requirment } = useRequirementData();
  const { user } = useUser();

  return (
    <Box component="form" sx={{ p: 2 }} className="w-full">
      <Box className="flex gap-10 w-full">
        <ControlledAutocomplete
          name="requirementId"
          control={control}
          label="ID necesar:"
          required={true}
          options={requirment
            ?.slice()
            .reverse()
            .filter((r) => r.status.toLowerCase() === "aprobat")}
          optionLabel="id"
          requiredText=""
          className="w-full"
        />

        <ReadOnlyInput
          value={user?.name ?? "Necunoscut"}
          label="Adaugat de:"
          className="w-full"
        />

        <ReadOnlyDate
          value={watch("createdAt")}
          className="w-full"
          label="La data de:"
        />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
