import { useMemo } from "react";
import { useProjects } from "./useProjects";

export const useGeneratedId = () => {
  const { data } = useProjects();

  const generatedId = useMemo(() => {
    const prefix = "PJ";

    const nextNr = (data?.length ?? 0) + 1;

    const paddedNr = nextNr.toString().padStart(4, "0");

    return prefix + paddedNr;
  }, [data]);

  return generatedId;
};
