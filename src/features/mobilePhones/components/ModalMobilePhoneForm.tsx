import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useItemsList } from "@/contexts/ItemsListContext";
import ControlledTextField from "@/components/ui/ControlledTextField";
import useIdGenerator from "../../../hooks/useIdGenerator";
import { useState } from "react";
import ControlledNumberField from "@/components/ui/ControlledNumberField";
import { useDocument } from "@/contexts/DocumentContext";
import UploadPdfButton from "@/components/ui/UploadPdfButton";
import { useForm, useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { INVOICE_INITIAL_STATE } from "../constants/invoiceInitialState";
import ControlledDate from "@/components/ui/ControlledDate";
import { MobilePhone } from "../types/phones.type";
import { useMobilePhones } from "../../../hooks/useMobilePhones";
import { PHONES_INITIAL_STATE } from "../constants/phonesInitialState";
import { MPHONES_PREFIX } from "../constants/constants";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

const ModalMobilePhoneForm = () => {
  const { control, handleSubmit, reset, getValues } =
    useFormContext<MobilePhone>();

  const { methods } = useInvoiceFormContext();
  const { getValues: getInvoiceValues } = methods;

  const { items, addItemsBatch } = useItemsList<Partial<MobilePhone>>();
  const { data: mobilePhones = [] } = useMobilePhones();
  const { setDocument, document, clearDocument } = useDocument();
  const generateId = useIdGenerator();

  const [quantity, setQuantity] = useState<number>(0);

  const handleReset = () => {
    const currentRequirementId = getValues("requirementId");
    const currentInvoice = getValues("refInvoice");

    reset({
      ...PHONES_INITIAL_STATE,
      requirementId: currentRequirementId,
      refInvoice: currentInvoice,
    });

    setQuantity(0);
    clearDocument();
  };

  const onSubmit = (data: Partial<MobilePhone>) => {
    const currentItemsPool = [...mobilePhones, ...items];

    const numToAdd = quantity > 0 ? quantity : 1;

    const newBatch: Partial<MobilePhone>[] = [];
    let updatedPool = [...currentItemsPool];

    for (let i = 0; i < numToAdd; i++) {
      const nextId = generateId(MPHONES_PREFIX, updatedPool);

      const newItem = {
        ...data,
        id: nextId,
        refInvoice:
          getInvoiceValues("sn") !== ""
            ? getInvoiceValues("sn")
            : data.refInvoice,
      };

      newBatch.push(newItem);
      updatedPool.push(newItem);
    }

    addItemsBatch(newBatch as MobilePhone[]);

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
            selectedFile={document}
            disabled={items.length !== 0}
          />

          {document ? (
            <InvoiceForm />
          ) : (
            <ControlledTextField
              name="sn"
              control={control}
              required={true}
              requiredText=""
              label="Ref. Factura"
              className="w-full"
              disabled={items.length !== 0}
              trim={true}
            />
          )}
        </>

        <hr />

        <ControlledTextField
          name="brand"
          control={control}
          required={true}
          requiredText=""
          label="Brand"
          className="w-full"
        />

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

export default ModalMobilePhoneForm;
