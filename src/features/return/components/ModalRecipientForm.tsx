"use client";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";

const ModalRecipientForm = () => {
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();

  const { control } = useFormContext();

  return (
    <Box component="form" autoComplete="off" className="px-2 mb-2">
      <Box className="flex flex-col">
        <ControlledAutocomplete
          control={control}
          name="recipientPersonId"
          requiredText="Selectarea unui primitor este obligatorie"
          label="Primitor"
          options={employees}
          optionLabel="name"
        />

        <ControlledAutocomplete
          control={control}
          name="projectId"
          requiredText="Selectarea unui proiect este obligatorie"
          label="Project"
          options={projects}
          optionLabel="name"
        />
      </Box>
    </Box>
  );
};

export default ModalRecipientForm;
