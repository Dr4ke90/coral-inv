import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postHandoverSheet } from "../../api/handovers/postHandoverSheet";
import { HandoverSheet } from "@/types/handoverSheet.type";

export const useCreateHandoverSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postHandoverSheet,
    onMutate: async (newSheet: HandoverSheet) => {
      await queryClient.cancelQueries({ queryKey: ["handovers"] });

      const previous = queryClient.getQueryData<HandoverSheet[]>(["handovers"]);

      queryClient.setQueryData<HandoverSheet[]>(["handovers"], (old) =>
        old ? [...old, newSheet] : [newSheet],
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
      queryClient.invalidateQueries({ queryKey: ["equipmentIt"] });
    },
  });
};
