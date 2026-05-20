import { EntryType } from "@/types/entry.type";
import { useItemsList } from "@/contexts/ItemsListContext";
import { useUser } from "@/contexts/AuthContext";
import { EquipmentType } from "@/types/equipment.type";
import { useFile } from "@/contexts/FileContext";

export const useEntryFactory = () => {
  const { user } = useUser();
  const { items } = useItemsList<EquipmentType>();
  const { file: pdfDocument } = useFile();

  const generateFormData = (formValues: EntryType) => {
    const total = items.reduce(
      (acc: number, item: any) => acc + (item.price || 0),
      0,
    );

    const invoiceValues = {
      ...formValues,
      items: items.map((item: any) => item.id),
      filePreview: !!pdfDocument,
      total: total,
      createdBy: user?.id,
      createdAt: new Date(),
    };

    const formData = new FormData();

    if (pdfDocument) {
      formData.append("pdf", pdfDocument);
    }

    formData.append("entry", JSON.stringify(invoiceValues));
    formData.append("items", JSON.stringify(items));

    return formData;
  };

  return generateFormData;
};
