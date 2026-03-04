import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { RequirementType } from "../types/requiment.type";
import DateInput from "../../../shared/components/ui/ReadOnlyDateInput";
import { useHeaderDataContext } from "../hooks/useHeaderDataContext";
import { useUserContext } from "@/features/users/hooks/useUserContext";
import { useGeneratedId } from "../hooks/useIdGeneration";
import { useEffect, useRef } from "react";

const ModalHeaderForm = () => {
  const { setHeaderValues } = useHeaderDataContext();
  const { user } = useUserContext();
  const projects: { label: string; id: string | number }[] = [];

  const nextId = useGeneratedId();

  const { control, watch } = useForm<Partial<RequirementType>>({
    defaultValues: {
      id: nextId,
      project: "",
      date: new Date(),
      createdBy: user?.name,
    },
  });

  const formValues = watch();
  const lastValuesRef = useRef("");

  useEffect(() => {
    const currentValuesStr = JSON.stringify(formValues);

    if (lastValuesRef.current !== currentValuesStr) {
      lastValuesRef.current = currentValuesStr;
      setHeaderValues(formValues);
    }
  }, [formValues, setHeaderValues]);

  return (
    <Box component="form" sx={{ p: 2 }}>
      <Box className="flex gap-10">
        <Controller
          name="project"
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
              value={projects?.find((p) => p.id === value) || null}
              isOptionEqualToValue={(option, val) => option.id === val.id}
              getOptionLabel={(option) => option.label || ""}
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
                  sx={{
                    backgroundColor: "azure",
                    color: "crimson",
                    "& .MuiInputBase-input": {
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "red",
                    },
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name="id"
          control={control}
          rules={{ required: "Numele creatorului este obligatoriu" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              label="Creat de"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "azure",
                color: "crimson",
                "& .MuiInputBase-input": {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center",
                },
              }}
            />
          )}
        />

        <Controller
          name="createdBy"
          control={control}
          rules={{ required: "Numele creatorului este obligatoriu" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              label="Creat de"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "azure",
                color: "crimson",
                "& .MuiInputBase-input": {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center",
                },
              }}
            />
          )}
        />

        <DateInput name="date" control={control} label="Data" />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
