import { useMemo } from "react";
import { useRequirementData } from "./useRequirementData";

export const useGeneratedId = () => {
  const { data } = useRequirementData();

  const generatedId = useMemo(() => {
    const prefix = "N";

    const nextNr = (data?.length ?? 0) + 1;

    const paddedNr = nextNr.toString().padStart(4, "0");

    return prefix + paddedNr;
  }, [data]);

  return generatedId;
};
