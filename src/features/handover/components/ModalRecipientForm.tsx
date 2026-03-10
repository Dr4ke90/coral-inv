"use client";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { useRecipientData } from "../contexts/RecipientContext";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";
import { useEffect } from "react";

const ModalRecipientForm = () => {
  const { recipientData, setRecipientPerson } = useRecipientData();
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();

  const { control, watch } = useForm<HandoverSheet>({
    defaultValues: {
      recipientPersonId: recipientData.recipientPersonId ?? "",
      projectId: recipientData.projectId ?? "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const { recipientPersonId, projectId } = watch();

  useEffect(() => {
    if (
      recipientPersonId !== recipientData.recipientPersonId ||
      projectId !== recipientData.projectId
    ) {
      setRecipientPerson({ recipientPersonId, projectId });
    }
  }, [
    recipientPersonId,
    projectId,
    setRecipientPerson,
    recipientData.recipientPersonId,
    recipientData.projectId,
  ]);

  return (
    <Box component="form" autoComplete="off" className="px-2 mb-2">
      <Box className="flex flex-col gap-2">
        <Controller
          name="recipientPersonId"
          control={control}
          rules={{ required: "Selectarea unui primitor este obligatorie" }}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <Autocomplete
              {...field}
              fullWidth
              options={employees || []}
              getOptionLabel={(option) => option?.name || ""}
              value={employees?.find((e) => e.id === value) || null}
              isOptionEqualToValue={(option, val) => option.id === val.id}
              onChange={(_, newValue) => {
                onChange(newValue ? newValue.id : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Primitor"
                  error={!!error}
                  helperText={error?.message}
                  size="small"
                />
              )}
            />
          )}
        />

        <Controller
          name="projectId"
          control={control}
          rules={{ required: "Selectarea unui proiect este obligatorie" }}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <Autocomplete
              {...field}
              fullWidth
              options={projects || []}
              getOptionLabel={(option) => option?.name || ""}
              value={projects?.find((p) => p.id === value) || null}
              isOptionEqualToValue={(option, val) => option.id === val.id}
              onChange={(_, newValue) => {
                onChange(newValue ? newValue.id : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proiect"
                  error={!!error}
                  helperText={error?.message}
                  size="small"
                />
              )}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default ModalRecipientForm;
