import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user.type";
import { updateUser } from "../../api/users/updateUser";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) =>
      updateUser(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previous = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["users"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
