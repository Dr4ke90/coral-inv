import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUser } from "@/features/users/hooks/useUser";
import { useFormContext } from "react-hook-form";

const ModalHeaderForm = () => {
  const { getValues, watch } = useFormContext();
  const currentId = watch("id");
  const { user } = useUser();

  return (
    <Box component="form" sx={{ p: 2 }}>
      <Box className="flex gap-10">
        <TextField
          value={currentId}
          label="ID Fisa"
          fullWidth
          size="small"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{
            backgroundColor: "azure",
            color: "crimson",
            "& .MuiInputBase-input": {
              fontSize: "18px",
              fontWeight: "bold",
              color: "red",
              textAlign: "center",
            },
          }}
        />

        <TextField
          value={user?.name}
          label="Creat de"
          fullWidth
          size="small"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{
            backgroundColor: "azure",
            color: "crimson",
            "& .MuiInputBase-input": {
              fontSize: "18px",
              fontWeight: "bold",
              color: "red",
              textAlign: "center",
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            value={getValues("date") ? dayjs(getValues("date")) : undefined}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  backgroundColor: "azure",
                  "& .MuiPickersInputBase-sectionsContainer": {
                    justifyContent: "center",
                  },
                  "& .MuiPickersSectionList-sectionContent": {
                    fontSize: "18px !important",
                    fontWeight: "bold !important",
                    color: "red !important",
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
    </Box>
  );
};

export default ModalHeaderForm;
