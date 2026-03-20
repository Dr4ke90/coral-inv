import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box } from "@mui/material";

interface DateInputProps {
  value: Date;
  className?: string;
  label?: string
}

const ReadOnlyDate = ({ value, label, className }: DateInputProps) => {
  return (
    <Box className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(value)}
          format="DD/MM/YYYY"
          label={label}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              sx: {
                backgroundColor: "azure",
                color: "crimson",
                margin: "2px 0 2px 0",
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
      </LocalizationProvider>
    </Box>
  );
};

export default ReadOnlyDate;
