import { EQUIPMENT_TYPES_CONFIG } from "@/constants/equipmentTypes";

export const getPrefixByType = (type: string): string => {
  const config = EQUIPMENT_TYPES_CONFIG.find((item) =>
    Array.isArray(item.types) ? item.types.includes(type) : item.types === type,
  );
  return config ? config.prefix : "GEN";
};
