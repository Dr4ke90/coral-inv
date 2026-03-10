import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postHandoverSheet } from "../api/postHandoverSheet";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { generatedId } from "@/shared/utils/generateId";
import { HANDOVER_PREFIX } from "../constants/constants";
import { useHandoverSheets } from "./useHandoverSheets";

export const useCreateHandoverSheet = () => {
  const queryClient = useQueryClient();
  const { data } = useHandoverSheets();
  const nextId = generatedId(HANDOVER_PREFIX, data);

  return useMutation({
    mutationFn: postHandoverSheet,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["handovers"] });

      const previous = queryClient.getQueryData<HandoverSheet[]>(["handovers"]);

      queryClient.setQueryData<HandoverSheet[]>(["handovers"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as HandoverSheet]
          : [{ ...newSheet, id: nextId } as HandoverSheet],
      );

      return { previous };
    },
    onError: (_err, _newSheet, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["handovers"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["handovers"] });
    },
  });
};
