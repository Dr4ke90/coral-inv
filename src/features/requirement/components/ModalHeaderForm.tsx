import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import { useUser } from "@/features/users/hooks/useUser";
import DateInput from "@/components/ui/ReadOnlyDate";
import { useProjects } from "@/hooks/useProjects";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";

const ModalHeaderForm = () => {
  const { data: projects } = useProjects();
  const { user } = useUser();

  const { control, getValues } = useFormContext();

  return (
    <Box component="form" sx={{ pb: 2 }}>
      <Box className="flex gap-10">
        <ControlledAutocomplete
          control={control}
          name="projectId"
          label="Proiect"
          options={projects ?? []}
          requiredText="Selectarea unui proiect este obligatorie"
          className="w-full"
          optionLabel="name"
        />

        <ReadOnlyInput value={getValues("id")} className="w-full" />

        <ReadOnlyInput value={user?.name ?? "Necunoscut"} className="w-full" />

        <DateInput value={getValues("date")} />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
