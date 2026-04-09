import { Autocomplete, Box, TextField } from "@mui/material";

interface SingleSelectPropsType {
  name: string;
  options: any[];
  label?: string;
  className?: string;
  value?: any;
  placeholder?: string;
  onChange?: (event: any, value: any) => void; // Adăugat pentru a putea prelua valoarea
}

const SingleSelect = ({
  name,
  options,
  label,
  className,
  value,
  placeholder,
  onChange,
}: SingleSelectPropsType) => {
  return (
    <Box className={className}>
      <Autocomplete
        id="single-select"
        options={options || []}
        getOptionLabel={(option) => option.name || ""}
        value={value || null}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            name={name}
            size="small"
            placeholder={placeholder}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        )}
      />
    </Box>
  );
};

export default SingleSelect;
