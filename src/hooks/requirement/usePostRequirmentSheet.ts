import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOneRequirementSheet } from "../../api/requirement/postOneRequirementSheet";
import { Requirement } from "../../types/requiment.type";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import { REQUIRMENTS_PREFIX } from "../../constants/requirementConstants";
import { useRequirementData } from "./useRequirementData";

export const usePostRequirement = () => {
  const queryClient = useQueryClient();
  const { data: requiments } = useRequirementData();
  const nextId = docsIdGenerator(REQUIRMENTS_PREFIX, requiments);

  return useMutation({
    mutationFn: postOneRequirementSheet,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["requirements"] });

      const previous = queryClient.getQueryData<Requirement[]>([
        "requirements",
      ]);

      queryClient.setQueryData<Requirement[]>(["requirements"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as Requirement]
          : [{ ...newSheet, id: nextId } as Requirement],
      );

      return { previous };
    },
    onError: (_err, _newSheet, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["requirements"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
  });
};
