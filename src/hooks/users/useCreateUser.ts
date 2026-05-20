import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user.type";
import { addUser } from "../../api/users/addUser";

export const useCreateUser = (nextId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previous = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (old) =>
        old
          ? [...old, { ...newUser, id: nextId } as User]
          : [{ ...newUser, id: nextId } as User],
      );

      return { previous };
    },
    onError: (_err, _newUser, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["users"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
