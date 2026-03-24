import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useItemsList } from "@/contexts/ItemsListContext";
import { Tablet } from "../types/tablet.type";
import ControlledTextField from "@/components/ui/ControlledTextField";
import useIdGenerator from "../hooks/useIdGenerator";
import { TABLET_PREFIX } from "../constants/constants";
import { useState } from "react";
import ControlledNumberField from "@/components/ui/ControlledNumberField";
import { useDocument } from "@/contexts/DocumentContext";
import UploadPdfButton from "@/components/ui/UploadPdfButton";
import { useForm, useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { TABLET_INITIAL_STATE } from "../constants/tabletInitialState";
import { INVOICE_INITIAL_STATE } from "../constants/invoiceInitialState";
import ControlledDate from "@/components/ui/ControlledDate";
import { useTablets } from "../hooks/useTablets";
import { Invoice } from "../types/invoice.type";

const ModalTabletForm = () => {
  const { control, handleSubmit, reset, getValues } = useFormContext<Tablet>();

  const invMethods = useForm<Invoice>({
    defaultValues: INVOICE_INITIAL_STATE,
  });

  const { items, addItemsBatch } = useItemsList<Partial<Tablet>>();
  const { data: tablets = [] } = useTablets();
  const { setDocument, clearDocument, document } = useDocument();
  const generateId = useIdGenerator();

  const [quantity, setQuantity] = useState<number>(0);

  const handleReset = () => {
    const currentRequirementId = getValues("requirementId");
    const currentInvoice = getValues("refInvoice");

    reset({
      ...TABLET_INITIAL_STATE,
      requirementId: currentRequirementId,
      refInvoice: { ...currentInvoice },
    });

    setQuantity(0);
  };

  const onSubmit = (data: Partial<Tablet>) => {
    const currentItemsPool = [...tablets, ...items];

    const numToAdd = quantity > 0 ? quantity : 1;

    const newBatch: Partial<Tablet>[] = [];
    let updatedPool = [...currentItemsPool];

    for (let i = 0; i < numToAdd; i++) {
      const nextId = generateId(TABLET_PREFIX, updatedPool);

      console.log(data);

      const newItem = {
        ...data,
        id: nextId,
        refInvoice: {
          ...invMethods.getValues(),
          preview: !!document,
        },
      };

      console.log("new", newItem);

      newBatch.push(newItem);
      updatedPool.push(newItem);
    }

    addItemsBatch(newBatch as Tablet[]);

    handleReset();
  };

  return (
    <Box component="form" autoComplete="off" className="p-2">
      <Box className="flex flex-col gap-2">
        <>
          <UploadPdfButton
            className="w-full"
            label="Incarca factura"
            onFileSelect={(file) => setDocument(file)}
            disabled={items.length !== 0}
          />

          {document ? (
            <Box className="flex justify-between ">
              <Typography color="primary">{document?.name}</Typography>
              <IconButton
                onClick={() => {
                  clearDocument();
                }}
                sx={{ padding: "0" }}
                color="error"
                disabled={items.length !== 0}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : null}

          <ControlledTextField
            name="sn"
            control={invMethods.control}
            required={true}
            requiredText=""
            label="Ref. Factura"
            className="w-full"
            disabled={items.length !== 0}
            trim={true}
          />

          {document ? (
            <>
              <ControlledDate
                name="date"
                control={invMethods.control}
                required={true}
                requiredText=""
                label="DD/MM/YYY"
                className="w-full"
                disabled={items.length !== 0}
              />

              <ControlledTextField
                name="vendor"
                control={invMethods.control}
                required={true}
                requiredText=""
                label="Vendor"
                className="w-full"
                disabled={items.length !== 0}
              />
            </>
          ) : null}
        </>

        <hr />

        <ControlledTextField
          name="model"
          control={control}
          required={true}
          requiredText=""
          label="Model"
          className="w-full"
        />

        <ControlledTextField
          name="config"
          control={control}
          required={true}
          requiredText=""
          label="Configuratie"
          className="w-full"
        />

        <Box className="flex flex gap-2">
          <ControlledNumberField
            name="price"
            control={control}
            required={true}
            requiredText=""
            label="Pret"
            className="w-full"
          />

          <TextField
            value={quantity ?? 0}
            size="small"
            label="Cantitate"
            onChange={(e) => {
              const onlyNumbers = e.target.value.replaceAll(/\D/g, "");
              setQuantity(onlyNumbers === "" ? 0 : Number(onlyNumbers));
            }}
            autoComplete="off"
            sx={{ margin: "2px 0 2px 0" }}
          />
        </Box>
      </Box>
      <Box className="flex justify-center mt-3">
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          Adauga
        </Button>
      </Box>
    </Box>
  );
};

export default ModalTabletForm;
