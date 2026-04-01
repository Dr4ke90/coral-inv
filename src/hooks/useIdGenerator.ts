import { useCallback } from "react";

interface Identifiable {
  id?: string;
}

const useIdGenerator = () => {
  const generateId = useCallback(
    <T extends Identifiable>(prefix: string, data?: T[]): string => {
      if (!Array.isArray(data) || data.length === 0) {
        return `${prefix}0001`;
      }

      const existingNumbers = data
        .map((item) => {
          if (!item?.id || !item.id.startsWith(prefix)) return null;
          const numericPart = Number(item.id.slice(prefix.length));
          return isNaN(numericPart) ? null : numericPart;
        })
        .filter((nr): nr is number => nr !== null)
        .sort((a, b) => a - b); 

      if (existingNumbers.length === 0 || existingNumbers[0] > 1) {
        return `${prefix}0001`;
      }

      let nextNumber = 1;

      for (let i = 0; i < existingNumbers.length; i++) {
        if (existingNumbers[i] === nextNumber) {
          nextNumber++;
        } else if (existingNumbers[i] > nextNumber) {
          break; 
        }
      }

      const paddedNr = nextNumber.toString().padStart(4, "0");
      return `${prefix}${paddedNr}`;
    },
    []
  );

  return generateId;
};

export default useIdGenerator;