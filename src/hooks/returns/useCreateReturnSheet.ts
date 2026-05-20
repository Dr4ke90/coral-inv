import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReturnSheet } from "../../api/returns/postReturnSheet";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import { RETURN_PREFIX } from "../../constants/handoverConstants";
import { useReturnSheets } from "./useReturnSheets";

export const useCreateReturnSheet = () => {
  const queryClient = useQueryClient();
  const { data } = useReturnSheets();
  const nextId = docsIdGenerator(RETURN_PREFIX, data);

  return useMutation({
    mutationFn: postReturnSheet,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["returns"] });

      const previous = queryClient.getQueryData<HandoverSheet[]>(["returns"]);

      queryClient.setQueryData<HandoverSheet[]>(["returns"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as HandoverSheet]
          : [{ ...newSheet, id: nextId } as HandoverSheet],
      );

      return { previous };
    },
    onError: (_err, _newSheet, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["returns"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
      queryClient.invalidateQueries({ queryKey: ["equipmentIt"] });
    },
  });
};
