import { EQUIPMENT_TYPES_CONFIG } from "@/constants/equipmentTypes";

export const getCategoryByType = (type: string): string => {
  const matchedConfig = EQUIPMENT_TYPES_CONFIG.find((config) =>
    config.types.includes(type),
  );

  return matchedConfig ? matchedConfig.category : "Necategorizat";
};
