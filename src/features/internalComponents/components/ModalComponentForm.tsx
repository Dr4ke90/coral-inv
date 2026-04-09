import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useItemsList } from "@/contexts/ItemsListContext";
import { COMPONENTS_EQUIPMENT_TYPES } from "../constants/componentsType";
import ControlledTextField from "@/components/ui/ControlledTextField";
import ControlledStringAutocomplete from "@/components/ui/ControlledStringAutocomplete";
import { COMPONENT_PREFIX } from "../constants/constants";
import { useState } from "react";
import { useDocument } from "@/contexts/DocumentContext";
import UploadPdfButton from "@/components/ui/UploadPdfButton";
import { useFormContext } from "react-hook-form";
import { ComponentType } from "../types/component.type";
import useIdGenerator from "@/hooks/useIdGenerator";
import { CategoryType } from "../types/category.type";
import { useComponents } from "../hooks/useComponents";
import { ITEMS_INITIAL_STATE } from "../constants/itemInitialState";
import { useUser } from "@/features/users/hooks/useUser";
import { toast } from "react-toastify";
import { generatedSubId } from "../utils/genereteSubId";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

const ModalComponentForm = () => {
  const { control, handleSubmit, reset, getValues } =
    useFormContext<ComponentType>();

  const { user } = useUser();

  const { data: components = [] } = useComponents();

  const { items: contextItems, addItem } =
    useItemsList<Partial<CategoryType>>();

  const { setDocument, clearDocument, document } = useDocument();
  const generateId = useIdGenerator();

  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const { methods: invoiceMethods } = useInvoiceFormContext();

  const { getValues: getInvoiceValues } = invoiceMethods;

  const handleReset = () => {
    const currentRequirementId = getValues("requirementId");
    const currentInvoice = getValues("refInvoice");

    reset({
      ...ITEMS_INITIAL_STATE,
      requirementId: currentRequirementId,
      refInvoice: currentInvoice,
    });

    setQuantity(0);
    setPrice(0);
    clearDocument();
  };

  const onSubmit = (data: Partial<CategoryType>) => {
    const numToAdd = quantity > 0 ? quantity : 1;

    const existingCategoryInDb = components.find(
      (c) =>
        c.type === data.type &&
        c.brand === data.brand &&
        c.model === data.model,
    );

    const baseCategoryId =
      existingCategoryInDb?.id ||
      generateId(COMPONENT_PREFIX, [...components, ...contextItems]);

    let tempSubItems = existingCategoryInDb?.items
      ? [...existingCategoryInDb.items]
      : [];

    const newSubItems: ComponentType[] = Array.from({ length: numToAdd }).map(
      () => {
        const newId = generatedSubId(baseCategoryId, tempSubItems);

        const newItem = {
          ...ITEMS_INITIAL_STATE,
          id: newId,

          price: price,
          addedBy: user?.employeeId || "",
          addedAt: new Date(),
          requirementId: data.requirementId ?? "",
          refInvoice:
            getInvoiceValues("sn") !== ""
              ? getInvoiceValues("sn")
              : getValues("refInvoice"),
        };

        tempSubItems.push(newItem);
        return newItem;
      },
    );

    const categoryToSubmit: Partial<CategoryType> = {
      ...data,
      id: baseCategoryId,
      items: newSubItems,
    };

    delete categoryToSubmit.requirementId;

    const existingInContext = contextItems.find(
      (c) =>
        c.type === data.type &&
        c.brand === data.brand &&
        c.model === data.model,
    );

    if (existingInContext) {
      toast.warning("Componenta există deja în coș.");
      return;
    } else {
      if (!existingCategoryInDb) {
        categoryToSubmit.createdAt = new Date();
        categoryToSubmit.createdBy = user?.employeeId || "";
      }
      addItem(categoryToSubmit);
    }

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
            disabled={contextItems.length !== 0}
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
              disabled={contextItems.length !== 0}
              trim={true}
            />
          )}
        </>

        <hr />

        <ControlledStringAutocomplete
          name="type"
          control={control}
          label="Tip"
          options={COMPONENTS_EQUIPMENT_TYPES}
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
          name="brand"
          control={control}
          required={true}
          requiredText=""
          label="Brand"
          className="w-full"
        />

        <ControlledTextField
          name="config"
          control={control}
          required={false}
          requiredText=""
          label="Configuratie"
          className="w-full"
        />

        <Box className="flex flex gap-2">
          <TextField
            value={price ?? 0}
            size="small"
            label="Pret"
            onChange={(e) => {
              const onlyNumbers = e.target.value.replaceAll(/\D/g, "");
              setPrice(onlyNumbers === "" ? 0 : Number(onlyNumbers));
            }}
            autoComplete="off"
            sx={{ margin: "2px 0 2px 0" }}
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

export default ModalComponentForm;
