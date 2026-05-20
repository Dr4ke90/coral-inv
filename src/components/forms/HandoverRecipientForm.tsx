import { Box } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useProjects } from "@/hooks/projects/useProjects";
import { useEmployees } from "@/hooks/employees/useEmployees";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useMemo } from "react";
import ControlledTextField from "../ui/ControlledTextField";

const HandoverRecipientForm = () => {
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();

  const { control } = useFormContext();

  const selectedRecipientId = useWatch({
    control,
    name: "recipientPersonId",
  });

  const filteredProjects = useMemo(() => {
    if (!selectedRecipientId) return [];

    const selectedEmployee = employees?.find(
      (e) => e.id === selectedRecipientId,
    );

    if (selectedEmployee && selectedEmployee.projects.length > 0) {
      return projects?.filter((p) => selectedEmployee.projects.includes(p.id));
    }

    return [];
  }, [selectedRecipientId, employees, projects]);

  return (
    <Box component="form" autoComplete="off" className="px-2 mb-2">
      <Box className="flex flex-col">
        <ControlledAutocomplete
          control={control}
          name="recipientPersonId"
          requiredText="Selectarea unui primitor este obligatorie"
          label="Primitor"
          options={employees?.filter((e) => e.id !== "E0000")}
          optionLabel="name"
        />

        <ControlledAutocomplete
          control={control}
          name="projectId"
          requiredText="Selectarea unui proiect este obligatorie"
          label="Project"
          options={filteredProjects}
          optionLabel="name"
        />

        <ControlledTextField
          control={control}
          name="department"
          label="Departament"
        />
      </Box>
    </Box>
  );
};

export default HandoverRecipientForm;
