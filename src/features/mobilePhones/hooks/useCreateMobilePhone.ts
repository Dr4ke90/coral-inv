import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMobilePhone } from "../api/postMobilePhone";

export const useCreateMobilePhone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMobilePhone,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mobilePhones"] });
    },

    onError: (error) => {
      console.error("A apărut o eroare la salvare:", error);
    },
  });
};
