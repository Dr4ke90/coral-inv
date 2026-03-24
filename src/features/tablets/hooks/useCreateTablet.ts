import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTablet } from "../api/postTablet";

export const useCreateTablet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTablet,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablets"] });
    },

    onError: (error) => {
      console.error("A apărut o eroare la salvare:", error);
    },
  });
};
