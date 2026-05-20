import { useUser } from "@/contexts/AuthContext";
import { useDocumentFormContext } from "@/contexts/DocumentFormContext";
import { EquipmentType } from "@/types/equipment.type";
import { equipmentIdGenerator } from "@/utils/equipmentIdGenerator";
import { getCategoryByType } from "@/utils/getCategoryByType";
import { getPrefixByType } from "@/utils/getPrefixByType";

export const useEquipmentFactory = () => {
  const { user } = useUser();
  const { methods: documentMethods } = useDocumentFormContext();
  const { getValues: getDocumentValues } = documentMethods;

  const generateNewEquipment = (
    values: Partial<EquipmentType>,
    updatedPool: Partial<EquipmentType>[],
  ) => {
    const prefix = getPrefixByType(values.type || "");

    const itemCategory = values.type
      ? getCategoryByType(values.type)
      : "Necategorizat";

    const nextId = equipmentIdGenerator(prefix, itemCategory, updatedPool);

    return {
      ...values,
      category: itemCategory,
      id: nextId,
      entryId: getDocumentValues("id"),
      createdAt: new Date(),
      createdBy: user?.id,
    };
  };

  return generateNewEquipment;
};
