import { Box } from "@mui/material";
import ControlledDate from "../ui/ControlledDate";
import ControlledTextField from "../ui/ControlledTextField";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useDocumentFormContext } from "@/contexts/DocumentFormContext";
import { EquipmentType } from "@/types/equipment.type";
import UploadPdfButton from "../ui/UploadPdfButton";
import { useFile } from "@/contexts/FileContext";

export const DocumentForm = () => {
  const { items } = useItemsList<Partial<EquipmentType>>();
  const { methods: documentMethods } = useDocumentFormContext();
  const { setFileContext, file } = useFile();

  const { control } = documentMethods;

  return (
    <Box className="flex flex-col gap-2">
      <ControlledDate
        name="date"
        control={control}
        required={true}
        requiredText=""
        label="Data document"
        className="w-full"
        disabled={items.length !== 0}
      />

      <ControlledTextField
        name="sn"
        control={control}
        required={true}
        requiredText=""
        label="Serie / Nr Document"
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

      <UploadPdfButton
        className="w-full"
        label="Incarca Document"
        onFileSelect={(file) => setFileContext(file)}
        selectedFile={file}
        disabled={items.length !== 0}
      />
    </Box>
  );
};

export default DocumentForm;
