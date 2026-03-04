import { Box, TextField, Button } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { RequirementFormValues } from "../types/requirmentFormValues.types";
import { useItemsListContext } from "../hooks/useItemsListContext";

const RequirmentForm = ({ children }: { children: ReactNode }) => {
  const { addItem, items } = useItemsListContext();

  const { control, handleSubmit, reset } = useForm<RequirementFormValues>({
    defaultValues: { item: "", quantity: "", unitPrice: "" },
  });

  const watchedValues = useWatch({ control });
  const { quantity, unitPrice } = watchedValues;

  const totalPrice = useMemo(
    () => (Number(quantity) || 0) * (Number(unitPrice) || 0),
    [quantity, unitPrice],
  );

  const sheetTotalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }, [items]);

  const onSubmit = (data: RequirementFormValues) => {
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
      className="p-2"
    >
      <Box className="mb-2">
        <Controller
          name="item"
          control={control}
          rules={{ required: "Denumirea resursei este obligatorie" }}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <TextField
              {...field}
              size="small"
              error={!!error}
              label="Denumire resursa"
              onChange={(e) => {
                const val = e.target.value;
                onChange(val);
              }}
              fullWidth
            />
          )}
        />
      </Box>
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
                color: "red",
                textAlign: "center",
              },
            }}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Adauga
          </Button>
        </Box>

        <Box
          sx={{ bgcolor: "#f5f5f5" }}
          className="flex flex-col justify-center items-center"
        >
          <Box>{children}</Box>

          <TextField
            label="Total"
            value={sheetTotalPrice}
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
                color: "red",
                textAlign: "center",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RequirmentForm;
