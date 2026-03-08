import { Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";

const ModalRecipientForm = () => {

  const { control, handleSubmit, reset } = useForm<HandoverSheet>({
    defaultValues: { recipientPerson: "", project: "" },
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
          name="recipientPerson"
          control={control}
          rules={{ required: "Numele persoanei care primeste este obligatoriu" }}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <TextField
              {...field}
              size="small"
              error={!!error}
              label="Primitor"
              onChange={(e) => {
                const val = e.target.value;
                onChange(val);
              }}
              fullWidth
            />
          )}
        />

        <Controller
          name="project"
          control={control}
          rules={{ required: "Proiectul este obligatoriu" }}
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <TextField
              {...field}
              error={!!error}
              size="small"
              label="Proiect"
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          )}
        />
      </Box>

    </Box>
  );
};

export default ModalRecipientForm;
