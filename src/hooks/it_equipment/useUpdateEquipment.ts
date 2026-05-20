import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEquipment } from "../../api/it_equipment/updateEquipment";
import { EquipmentType } from "@/types/equipment.type";

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<EquipmentType>;
    }) => updateEquipment(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["equipmentIt"] });

      const previous = queryClient.getQueryData<EquipmentType[]>([
        "equipmentIt",
      ]);

      queryClient.setQueryData<EquipmentType[]>(["equipmentIt"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["equipmentIt"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["equipmentIt"] });
    },
  });
};
