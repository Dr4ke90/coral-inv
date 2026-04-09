import { Box, IconButton, Typography } from "@mui/material";
import ControlledDate from "../ui/ControlledDate";
import ControlledTextField from "../ui/ControlledTextField";
import { useDocument } from "@/contexts/DocumentContext";
import { useItemsList } from "@/contexts/ItemsListContext";
import ControlledNumberField from "../ui/ControlledNumberField";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

export const InvoiceForm = () => {
  const { document, clearDocument } = useDocument();
  const { items } = useItemsList();

  const { methods } = useInvoiceFormContext();
  const { control, reset } = methods;

  const handleClear = () => {
    clearDocument();
    reset();
  };

  return (
    <Box className="flex flex-col gap-2">
      

      <ControlledDate
        name="date"
        control={control}
        required={true}
        requiredText=""
        label="DD/MM/YYY"
        className="w-full"
        disabled={items.length !== 0}
      />

      <ControlledTextField
        name="sn"
        control={control}
        required={true}
        requiredText=""
        label="S/N"
        className="w-full"
        trim={true}
        disabled={items.length !== 0}
      />

      <ControlledTextField
        name="vendor"
        control={control}
        required={true}
        requiredText=""
        label="Vendor"
        className="w-full"
        disabled={items.length !== 0}
      />

      <ControlledNumberField
        name="total"
        control={control}
        required={true}
        requiredText=""
        label="Total factura"
        className="w-full"
        disabled={items.length !== 0}
      />
    </Box>
  );
};

export default InvoiceForm;
