import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReturnSheet } from "../api/postReturnSheet";
import { HandoverSheet } from "@/types/handoverSheet.type";
import { generatedId } from "@/utils/generateId";
import { RETURN_PREFIX } from "../constants/constants";
import { useReturnSheets } from "./useReturnSheets";

export const useCreateReturnSheet = () => {
  const queryClient = useQueryClient();
  const { data } = useReturnSheets();
  const nextId = generatedId(RETURN_PREFIX, data);

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
    },
  });
};
