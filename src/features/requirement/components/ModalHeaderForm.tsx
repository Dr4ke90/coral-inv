import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/shared/components/ui/ReadOnlyInput";
import { useUser } from "@/features/users/hooks/useUser";
import DateInput from "@/shared/components/ui/ReadOnlyDateInput";
import { useProjects } from "@/hooks/useProjects";

const ModalHeaderForm = () => {
  const { data: projects } = useProjects();
  const { user } = useUser();

  const { control } = useFormContext();

  return (
    <Box component="form" sx={{ pb: 2 }}>
      <Box className="flex gap-10">
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
              value={projects?.find((p) => p.id === value) || null}
              isOptionEqualToValue={(option, val) => option.id === val.id}
              getOptionLabel={(option) => option.name || ""}
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
                    margin: "10px 0 10px 0",
                    "& .MuiInputBase-input": {
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
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
          render={({ field }) => (
            <ReadOnlyInput value={field.value} className="w-full" />
          )}
        />

        <Controller
          name="createdBy"
          control={control}
          render={() => (
            <ReadOnlyInput
              value={user?.name ?? "Necunoscut"}
              className="w-full"
            />
          )}
        />

        <DateInput name="date" control={control} label="Data" />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
