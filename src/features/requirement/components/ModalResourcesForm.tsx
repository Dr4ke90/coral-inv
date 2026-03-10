import { Box, TextField, Button } from "@mui/material";
import { useMemo } from "react";
import { Controller, useWatch, useFormContext } from "react-hook-form";
import { useItemsList } from "@/contexts/ItemsListContext";
import { ResourceType } from "../types/resource.type";

const ModalResourcesForm = () => {
  const { addItem } = useItemsList();

  const { control, handleSubmit, reset } = useFormContext<ResourceType>();

  const watchedValues = useWatch({ control });
  const { quantity, unitPrice } = watchedValues;

  const totalPrice = useMemo(
    () => (Number(quantity) || 0) * (Number(unitPrice) || 0),
    [quantity, unitPrice],
  );

  const onSubmit = (data: ResourceType) => {
    addItem({
      ...data,
      totalPrice,
      um: "BUC",
      currency: "RON",
    });
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="pt-4"
    >
      <Box className="flex flex-row ">
        <Box className="flex flex-col items-center mb-4 mr-4 gap-4 ">
          <Controller
            name="quantity"
            control={control}
            rules={{ required: "Cantitatea este obligatorie" }}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <TextField
                {...field}
                error={!!error}
                size="small"
                label="Cantitate"
                onChange={(e) => {
                  const val = e.target.value.replaceAll(/\D/g, "");
                  onChange(val === "" ? "" : Number(val));
                }}
                autoComplete="off"
                fullWidth
              />
            )}
          />

          <Controller
            name="unitPrice"
            control={control}
            rules={{ required: "Pretul este obligatorie" }}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <TextField
                {...field}
                error={!!error}
                size="small"
                label="Pret"
                onChange={(e) => {
                  const val = e.target.value.replaceAll(/\D/g, "");
                  onChange(val === "" ? "" : Number(val));
                }}
                autoComplete="off"
                fullWidth
              />
            )}
          />

          <TextField
            label="Total"
            value={totalPrice}
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
                color: "blue",
                textAlign: "center",
              },
            }}
            fullWidth
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Adauga
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalResourcesForm;
