import { useMemo } from "react";

export const useGeneratedId = <T>(prefix: string, data?: T[]): string => {
  const generatedId = useMemo(() => {
    const nextNr = (data?.length ?? 0) + 1;
    const paddedNr = nextNr.toString().padStart(4, "0");
    return prefix + paddedNr;
  }, [data, prefix]);

  return generatedId;
};
