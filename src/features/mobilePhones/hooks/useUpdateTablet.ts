import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMobilePhone } from "../api/updateMobilePhone";
import { MobilePhone } from "../types/phones.type";

export const useUpdateMobilePhone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<MobilePhone>;
    }) => updateMobilePhone(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["mobilePhones"] });

      const previous = queryClient.getQueryData<MobilePhone[]>([
        "mobilePhones",
      ]);

      queryClient.setQueryData<MobilePhone[]>(["mobilePhones"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["mobilePhones"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["mobilePhones"] });
    },
  });
};
