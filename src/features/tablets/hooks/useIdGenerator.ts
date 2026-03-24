import { useCallback } from "react";
import { Tablet } from "../types/tablet.type";

const useIdGenerator = () => {
  const generateId = useCallback(
    (prefix: string, data?: Partial<Tablet>[]): string => {
      if (!Array.isArray(data) || data.length === 0) {
        return prefix + "0001";
      }

      const maxNumber = data.reduce((max, item) => {
        if (!item?.id?.startsWith(prefix)) return max;

        const numericPart = Number(item.id.slice(prefix.length));
        if (!Number.isFinite(numericPart)) return max;

        return Math.max(numericPart, max);
      }, 0);

      let nextInvNo = maxNumber + 1;

      while (true) {
        const paddedNr = nextInvNo.toString().padStart(4, "0");
        const newInvNo = prefix + paddedNr;

        const exists = data.some((item) => item.id === newInvNo);
        if (!exists) return newInvNo;

        nextInvNo++;
      }
    },
    [],
  );

  return generateId;
};

export default useIdGenerator;
