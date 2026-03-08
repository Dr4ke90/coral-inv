import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { useMemo, useState } from "react";




const ModalEquipmentForm = () => {
    const [equimentList, setEqList] = useState<EquipmentType[]>([])

    const [selectedItem, setSelectedItem] = useState<Partial<EquipmentType>>({})

    const { control, handleSubmit, reset } = useForm<Partial<EquipmentType>>({
        defaultValues: { id: "" },
    });




    const onSubmit = (data: Partial<HandoverSheet>) => {
        console.log(data)
        reset();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="p-2"
        >
            <Box className="mb-2">
                <Controller
                    name="id"
                    control={control}
                    rules={{ required: "Selectarea unui proiect este obligatorie" }}
                    render={({
                        field: { onChange, value, ...field },
                        fieldState: { error },
                    }) => (
                        <Autocomplete
                            {...field}
                            fullWidth
                            options={equimentList || []}
                            value={equimentList?.find((p) => p.id === value) || null}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            onChange={(_, newValue) => {
                                onChange(newValue ? newValue.id : "");
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="id"
                                    error={!!error}
                                    helperText={error?.message}
                                    size="small"
                                    sx={{
                                        backgroundColor: "azure",
                                        color: "crimson",
                                        "& .MuiInputBase-input": {
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: "red",
                                        },
                                    }}
                                />
                            )}
                        />
                    )}
                />

               
            </Box>

        </Box>
    );
};

export default ModalEquipmentForm;
