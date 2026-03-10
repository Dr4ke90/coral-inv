import { Box, TextField } from "@mui/material";

const ReadOnlyInput = ({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) => {
  return (
    <Box className={className}>
      <TextField
        fullWidth
        label="Total"
        value={value}
        size="small"
        placeholder="Pret colectat"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        sx={{
          backgroundColor: "azure",
          color: "crimson",
          margin: "10px 0 10px 0",
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
