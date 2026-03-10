import { Box, TextField } from "@mui/material";
import { useHeaderData } from "../contexts/HeaderDataContext";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUserContext } from "@/features/users/hooks/useUserContext";

const ModalHeaderForm = () => {
  const { headerData } = useHeaderData();
  const { user } = useUserContext();

  return (
    <Box component="form" sx={{ p: 2 }}>
      <Box className="flex gap-10">
        <TextField
          value={headerData.id}
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
            value={headerData?.date ? dayjs(headerData.date) : undefined}
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
