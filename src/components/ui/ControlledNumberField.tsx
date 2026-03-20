import { Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type ControlledNumberFieldProps = {
  name: string;
  control: Control<any>;
  required?: boolean;
  requiredText?: string;
  label?: string;
  className?: string;
};

const ControlledNumberField = ({
  name,
  control,
  required = false,
  requiredText,
  label,
  className,
}: ControlledNumberFieldProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? requiredText || true : false }}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <TextField
            {...field}
            value={value ?? ""}
            size="small"
            error={!!error}
            helperText={error?.message}
            label={label}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replaceAll(/\D/g, "");

              onChange(onlyNumbers === "" ? null : Number(onlyNumbers));
            }}
            required={required}
            autoComplete="off"
            fullWidth
            sx={{ margin: "2px 0 2px 0" }}
          />
        )}
      />
    </Box>
  );
};

export default ControlledNumberField;
