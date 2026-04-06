"use client";
import { Box } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useEffect, useMemo } from "react";

const ModalRecipientForm = () => {
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
      (e) => e.id === selectedRecipientId || e.id === "E0000",
    );

    if (selectedEmployee && selectedEmployee.project) {
      return projects?.filter((p) => p.id === selectedEmployee.project);
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
          options={employees?.filter((e) => e.id === "E0000")}
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
