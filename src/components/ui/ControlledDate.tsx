import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface DateInputProps {
  name: string;
  control: Control<any>;
  requiredText?: string;
  required?: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const ControlledDate = ({
  name,
  control,
  requiredText,
  required = false,
  label,
  className,
  disabled,
}: DateInputProps) => {
  return (
    <Box className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? requiredText || true : false }}
        render={({
          field: { onChange, value, ref, ...restField },
          fieldState: { error },
        }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...restField}
              label={label}
              format="DD/MM/YYYY"
              onChange={onChange}
              value={value ? dayjs(value) : null}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  required: required,
                  error: !!error,
                  helperText: error ? error.message : null,
                  disabled: disabled,
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
};

export default ControlledDate;
