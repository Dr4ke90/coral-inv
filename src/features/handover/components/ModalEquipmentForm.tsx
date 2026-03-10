import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useSelectedElement from "../hooks/useSelectedElement";
import { usePreviewList } from "../contexts/PreviewListContext";

const ModalEquipmentForm = () => {
  const [equimentList, setEqList] = useState<EquipmentType[]>([
    {
      id: "CIT002",
      type: "Boxe",
      model: "CORAL",
      series: "N/A",
      status: "Nou",
    },
    {
      id: "CIT004",
      type: "Imprimanta",
      model: "Brother",
      series: "N/A",
      status: "Nou",
    },
  ]);

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<EquipmentType>({
      defaultValues: {
        id: "",
        type: "",
        model: "",
        series: "",
        status: "",
      },
    });

  const selectedId = watch("id");

  const selectedElement = useSelectedElement(selectedId, equimentList);

  useEffect(() => {
    if (selectedElement) {
      setValue("type", selectedElement.type);
      setValue("model", selectedElement.model);
      setValue("series", selectedElement.series);
      setValue("status", selectedElement.status);
    } else {
      setValue("type", "");
      setValue("model", "");
      setValue("series", "");
      setValue("status", "");
    }
  }, [selectedElement, setValue]);

  const { addItem } = usePreviewList();

  const onSubmit = (data: EquipmentType) => {
    if (!data.id) return;

    addItem(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="p-2"
    >
      <Box className="flex flex-col gap-2">
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
              getOptionLabel={(option) => option.id || ""}
              onChange={(_, newValue) => {
                onChange(newValue ? newValue.id : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="CIT"
                  error={!!error}
                  helperText={error?.message}
                  size="small"
                />
              )}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tip"
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "azure",
              }}
              focused={false}
            />
          )}
        />

        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Model"
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "azure",
              }}
              focused={false}
            />
          )}
        />

        <Controller
          name="series"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Serie"
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "azure",
              }}
              focused={false}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Status"
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                backgroundColor: "azure",
              }}
              focused={false}
            />
          )}
        />
      </Box>
      <Box className="flex justify-center mt-3">
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          Adauga
        </Button>
      </Box>
    </Box>
  );
};

export default ModalEquipmentForm;
