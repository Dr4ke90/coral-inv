import { Box } from "@mui/material";
import { useUser } from "@/features/users/hooks/useUser";
import { useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/shared/components/ui/ReadOnlyInput";
import ReadOnlyDate from "@/shared/components/ui/ReadOnlyDate";
import ControlledAutocomplete from "@/shared/components/ui/ControlledAutocomplete";
import { useRequirementData } from "@/features/requirement";
import ControlledTextField from "@/shared/components/ui/ControlledTextField";

const invoices = [
  {
    id: "INV0001",
    sn: "fsdgdfgdf",
    date: "",
    vendor: "",
  },
  {
    id: "INV0002",
    sn: "sdfsdf",
    date: "",
    vendor: "",
  },
];

const ModalHeaderForm = () => {
  const { control, watch } = useFormContext();
  const { user } = useUser();
  const { data: requirment } = useRequirementData();

  return (
    <Box component="form" sx={{ p: 2 }} className="w-full">
      <Box className="flex gap-10 w-full">
        <ControlledAutocomplete
          name="requirementId"
          control={control}
          label="ID necesar"
          required={true}
          options={requirment?.slice().reverse()}
          optionLabel="id"
          requiredText=""
          className="w-full"
        />

        <ControlledTextField
          name="invoice"
          control={control}
          label="S/N Factura"
          required={true}
          requiredText=""
          trim={true}
          className="w-full"
        />

        <ReadOnlyInput
          value={user?.name ?? "Necunoscut"}
          label="Adaugat de"
          className="w-full"
        />
        <ReadOnlyDate value={watch("date")} className="w-full" />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
