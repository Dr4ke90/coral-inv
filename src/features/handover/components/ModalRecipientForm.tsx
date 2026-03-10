"use client";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useProjects } from "@/hooks/useProjects";
import { useEmployees } from "@/hooks/useEmployees";

const ModalRecipientForm = () => {
  const { data: projects } = useProjects();
  const { data: employees } = useEmployees();

  const { control } = useFormContext();

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
