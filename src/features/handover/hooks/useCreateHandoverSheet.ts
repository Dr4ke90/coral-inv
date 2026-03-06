import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postHandoverSheet } from "../api/postHandoverSheet";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export const useCreateHandoverSheet = (nextId: string) => {
  const queryClient = useQueryClient();

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
