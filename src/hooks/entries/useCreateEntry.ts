import { postEntry } from "@/api/entries/postEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postEntry(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      queryClient.invalidateQueries({ queryKey: ["equipmentIt"] });
    },

    onError: (error) => {
      console.error("A apărut o eroare la salvare:", error);
    },
  });
};
