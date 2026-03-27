import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComponent } from "../api/postComponent";

export const useCreateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComponent,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internalComponents"] });
    },

    onError: (error) => {
      console.error("A apărut o eroare la salvare:", error);
    },
  });
};
