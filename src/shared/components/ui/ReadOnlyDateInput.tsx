import {
  LocalizationProvider,
  DatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

interface DateInputProps<T extends FieldValues> extends Omit<
  DatePickerProps,
  "value" | "onChange"
> {
  name: Path<T>;
  control: Control<T>;
  helperText?: string;
}

const DateInput = <T extends FieldValues>({
  name,
  control,
  helperText,
  ...props
}: DateInputProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => {
          const dateValue = value ? dayjs(value) : null;
          return (
            <DatePicker
              {...props}
              value={dateValue}
              inputRef={ref}
              format="DD/MM/YYYY"
              onChange={(newValue: Dayjs | null) => {
                const valToSave = newValue?.isValid()
                  ? newValue.toISOString()
                  : null;
                onChange(valToSave);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: !!error,
                  helperText: error?.message || helperText,
                  sx: {
                    backgroundColor: "azure",
                    color: "crimson",
                    margin: "10px 0 10px 0",
                    "& .MuiPickersInputBase-sectionsContainer": {
                      justifyContent: "center",
                    },
                    "& .MuiPickersSectionList-sectionContent": {
                      fontSize: "18px !important",
                      fontWeight: "bold !important",
                      color: "blue !important",
                      padding: "0 5px",
                    },
                  },
                },
                openPickerButton: {
                  sx: { display: "none" },
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
