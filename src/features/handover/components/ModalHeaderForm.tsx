import { Box } from "@mui/material";
import { useUser } from "@/features/users/hooks/useUser";
import { useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ReadOnlyDate from "@/components/ui/ReadOnlyDate";

const ModalHeaderForm = () => {
  const { watch } = useFormContext();
  const { user } = useUser();

  return (
    <Box component="form" sx={{ p: 2 }} className="w-full">
      <Box className="flex gap-10 w-full">
        <ReadOnlyInput
          value={user?.name ?? "Necunoscut"}
          label="Predat de"
          className="w-full"
        />
        <ReadOnlyInput value={watch("id")} label="ID Fisa" className="w-full" />
        <ReadOnlyDate value={watch("date")} className="w-full" />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
