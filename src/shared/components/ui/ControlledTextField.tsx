import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
  control: any;
  requiredText?: string;
  label?: string;
  className?: string;
};

const ControlledTextField = ({
  name,
  control,
  requiredText,
  label,
  className,
}: ControlledTextFieldProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: requiredText }}
        render={({ field: { onChange, ...field }, fieldState: { error } }) => (
          <TextField
            {...field}
            size="small"
            error={!!error}
            label={label}
            onChange={(e) => {
              const val = e.target.value;
              onChange(val);
            }}
            autoComplete="off"
            fullWidth
            sx={{ margin: "2px 0 2px 0" }}
          />
        )}
      />
    </Box>
  );
};

export default ControlledTextField;
