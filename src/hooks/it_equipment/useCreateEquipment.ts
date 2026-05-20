import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEquipment } from "../../api/it_equipment/postEquipment";

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEquipment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentIt"] });
    },

    onError: (error) => {
      console.error("A apărut o eroare la salvare:", error);
    },
  });
};
