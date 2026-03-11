import { Box, TextField } from "@mui/material";

const ReadOnlyInput = ({
  value,
  className,
  label,
  placeholder,
}: {
  value: string | number;
  label?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <Box className={className}>
      <TextField
        fullWidth
        label={label}
        focused={false}
        value={value}
        size="small"
        placeholder={placeholder}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        sx={{
          backgroundColor: "azure",
          color: "crimson",
          margin: "2px 0 2px 0",
          "& .MuiInputBase-input": {
            fontSize: "18px",
            fontWeight: "bold",
            color: "blue",
            textAlign: "center",
          },
        }}
      />
    </Box>
  );
};

export default ReadOnlyInput;
