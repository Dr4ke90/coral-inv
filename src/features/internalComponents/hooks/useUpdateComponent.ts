import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComponent } from "../api/updateComponent";
import { CategoryType } from "../types/category.type";

export const useUpdateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<CategoryType>;
    }) => updateComponent(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["internalComponents"] });

      const previous = queryClient.getQueryData<CategoryType[]>(["internalComponents"]);

      queryClient.setQueryData<CategoryType[]>(["internalComponents"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["internalComponents"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["internalComponents"] });
    },
  });
};
