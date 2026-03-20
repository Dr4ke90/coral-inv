import { Autocomplete, Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type ControlledStringAutocompleteProps = {
  control: Control<any>;
  requiredText?: string;
  name: string;
  label?: string;
  options: string[];
  className?: string;
};

const ControlledStringAutocomplete = ({
  control,
  requiredText,
  name,
  label,
  className,
  options = [],
}: ControlledStringAutocompleteProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: requiredText }}
        render={({
          field: { onChange, value, ref, ...field },
          fieldState: { error },
        }) => (
          <Autocomplete
            {...field}
            fullWidth
            options={options}
            getOptionLabel={(option) => option || ""}
            value={value || null}
            isOptionEqualToValue={(option, val) => option === val}
            onChange={(_, newValue) => {
              onChange(newValue || "");
            }}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                label={label}
                error={!!error}
                // helperText={error?.message}
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

export default ControlledStringAutocomplete;
