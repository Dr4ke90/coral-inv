import { Box, Button, TextField } from "@mui/material";
import { useItemsList } from "@/contexts/ItemsListContext";
import { Equipment } from "../types/equipment.type";
import { IT_EQUIPMENT_TYPES } from "../constants/equipmentTypes";
import ControlledTextField from "@/components/ui/ControlledTextField";
import ControlledStringAutocomplete from "@/components/ui/ControlledStringAutocomplete";
import useIdGenerator from "../hooks/useIdGenerator";
import { EQUIPMENT_PREFIX } from "../constants/constants";
import { useEquipment } from "../../../hooks/useEquipment";
import { useState } from "react";
import ControlledNumberField from "@/components/ui/ControlledNumberField";
import { useDocument } from "@/contexts/DocumentContext";
import UploadPdfButton from "@/components/ui/UploadPdfButton";
import { useFormContext } from "react-hook-form";
import { EQ_INITIAL_STATE } from "../constants/eqInitialState";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

const ModalEquipmentForm = () => {
  const { control, handleSubmit, reset, getValues, watch } =
    useFormContext<Equipment>();

  const { methods } = useInvoiceFormContext();
  const { getValues: getInvoiceValues } = methods;

  const { items, addItemsBatch } = useItemsList<Partial<Equipment>>();
  const { data: equipmentIt = [] } = useEquipment();
  const { setDocument, document, clearDocument } = useDocument();
  const generateId = useIdGenerator();

  const [quantity, setQuantity] = useState<number>(0);

  const handleReset = () => {
    const currentRequirementId = getValues("requirementId");
    const currentInvoice = getValues("refInvoice");

    reset({
      ...EQ_INITIAL_STATE,
      requirementId: currentRequirementId,
      refInvoice: currentInvoice,
    });

    setQuantity(0);
    clearDocument();
  };

  const onSubmit = (data: Partial<Equipment>) => {
    const currentItemsPool = [...equipmentIt, ...items];

    const numToAdd = quantity > 0 ? quantity : 1;

    const newBatch: Partial<Equipment>[] = [];
    let updatedPool = [...currentItemsPool];

    for (let i = 0; i < numToAdd; i++) {
      const nextId = generateId(EQUIPMENT_PREFIX, updatedPool);
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

    addItemsBatch(newBatch as Equipment[]);

    handleReset();
  };

  return (
    <Box component="form" autoComplete="off" className="p-2">
      <Box className="flex flex-col gap-2">
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
            name="refInvoice"
            control={control}
            required={true}
            requiredText=""
            label="Ref. Factura"
            className="w-full"
            disabled={items.length !== 0}
            trim={true}
          />
        )}

        <hr />

        <ControlledStringAutocomplete
          name="type"
          control={control}
          label="Tip"
          options={IT_EQUIPMENT_TYPES}
          requiredText="Selectarea unui tip este obligatorie"
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

export default ModalEquipmentForm;
