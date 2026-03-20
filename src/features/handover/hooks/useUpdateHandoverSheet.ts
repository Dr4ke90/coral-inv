import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHandoverSheet } from "../api/updateHandoverSheet";
import { HandoverSheet } from "@/types/handoverSheet.type";

export const useUpdateHandoverSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<HandoverSheet>;
    }) => updateHandoverSheet(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["handovers"] });

      const previous = queryClient.getQueryData<HandoverSheet[]>(["handovers"]);

      queryClient.setQueryData<HandoverSheet[]>(["handovers"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["handovers"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["handovers"] });
    },
  });
};
