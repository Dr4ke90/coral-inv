import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledTextField = ({ control }: { control: any }) => {
  return (
    <Controller
      name="item"
      control={control}
      rules={{ required: "Denumirea resursei este obligatorie" }}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          size="small"
          error={!!error}
          label="Denumire resursa"
          onChange={(e) => {
            const val = e.target.value;
            onChange(val);
          }}
          autoComplete="off"
          fullWidth
        />
      )}
    />
  );
};

export default ControlledTextField;
