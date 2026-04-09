"use client";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useUser } from "@/features/users/hooks/useUser";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";

const ModalRecipientForm = () => {
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();
  const { user } = useUser();

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
      return projects?.filter(
        (p) =>
          selectedEmployee.projects.includes(p.id) || p.status === "Active",
      );
    }

    return [];
  }, [selectedRecipientId, employees, projects]);

  return (
    <Box component="form" autoComplete="off" className="px-2 mb-2">
      <Box className="flex flex-col gap-2">
        <ControlledAutocomplete
          control={control}
          name="recipientPersonId"
          requiredText="Selectarea unui primitor este obligatorie"
          label="Primitor"
          options={employees?.filter(
            (e) =>
              e.id !== user?.employeeId &&
              e.id !== "E0000" &&
              e.status.toLowerCase() === "activ",
          )}
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
      </Box>
    </Box>
  );
};

export default ModalRecipientForm;
