import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledAutocompleteProps = {
  control: any;
  requiredText?: string;
  name: string;
  label?: string;
  options?: any[];
  className?: string;
  optionLabel: string;
};

const ControlledAutocomplete = ({
  control,
  requiredText,
  name,
  label,
  className,
  options,
  optionLabel,
}: ControlledAutocompleteProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: requiredText }}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <Autocomplete
            {...field}
            fullWidth
            options={options || []}
            getOptionLabel={(option) => option?.[optionLabel] || ""}
            value={options?.find((p) => p.id === value) || null}
            isOptionEqualToValue={(option, val) =>
              !!val && option.id === val.id
            }
            onChange={(_, newValue) => {
              onChange(newValue ? newValue.id : "");
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id ?? option.name}>
                {option[optionLabel]}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
                size="small"
                sx={{ margin: "2px 0 2px 0" }}
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default ControlledAutocomplete;
