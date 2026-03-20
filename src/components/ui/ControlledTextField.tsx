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
};

const ControlledTextField = ({
  name,
  control,
  required = false,
  requiredText,
  label,
  className,
  trim,
  disabled = false,
}: ControlledTextFieldProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? requiredText || true : false }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            size="small"
            error={!!error}
            helperText={error?.message}
            label={label}
            onChange={(e) => {
              let val = e.target.value;

              if (trim) {
                val = val.toUpperCase().replaceAll(/[^A-Z0-9]/g, "");
              }

              field.onChange(val);
            }}
            value={field.value || ""}
            required={required}
            autoComplete="off"
            fullWidth
            sx={{ margin: "2px 0 2px 0" }}
            disabled={disabled}
          />
        )}
      />
    </Box>
  );
};

export default ControlledTextField;
