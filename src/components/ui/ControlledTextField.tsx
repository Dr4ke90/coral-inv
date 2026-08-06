import { Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
  control: Control<any>;
  required?: boolean;
  requiredText?: string;
  label?: string;
  className?: string;
  trim?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
  readOnly?: boolean;
};

const ControlledTextField = ({
  name,
  control,
  required = false,
  requiredText,
  label,
  className,
  trim = false,
  disabled = false,
  multiline = false,
  minRows = 1,
  readOnly = false,
}: ControlledTextFieldProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? requiredText || "Câmpul este obligatoriu"
            : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            size="small"
            error={!!error}
            helperText={error?.message}
            label={label}
            multiline={multiline}
            minRows={multiline ? minRows : undefined}
            onChange={(event) => {
              let value = event.target.value;

              if (trim) {
                value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
              }

              field.onChange(value);
            }}
            value={field.value ?? ""}
            required={required}
            autoComplete="off"
            fullWidth
            sx={{ margin: "2px 0" }}
            disabled={disabled}
          />
        )}
      />
    </Box>
  );
};

export default ControlledTextField;
