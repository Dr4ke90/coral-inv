import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "../../api/entries/updateEntry";
import { EntryType } from "@/types/entry.type";

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<EntryType>;
    }) => updateEntry(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["entries"] });

      const previous = queryClient.getQueryData<EntryType[]>(["entries"]);

      queryClient.setQueryData<EntryType[]>(["entries"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["entries"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });
};
