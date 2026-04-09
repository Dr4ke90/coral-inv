import { Autocomplete, Box, TextField } from "@mui/material";

interface MultiSelectPropsType {
  options: any[];
  name?: string;
  label?: string;
  className?: string;
  value?: any[];
  placeholder?: string;
  onChange?: (event: any, value: any) => void;
}

const MultiSelect = ({
  options,
  label,
  className,
  value,
  placeholder,
  onChange,
}: MultiSelectPropsType) => {
  return (
    <Box className={className}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={options || []}
        getOptionLabel={(option) => option.name}
        value={value}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            size="small"
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
};

export default MultiSelect;
