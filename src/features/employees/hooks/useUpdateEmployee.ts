import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee } from "../types/employee.type";
import { updateEmployee } from "../api/updateEmployee";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Employee> }) =>
      updateEmployee(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["employees"] });

      const previous = queryClient.getQueryData<Employee[]>(["employees"]);

      queryClient.setQueryData<Employee[]>(["employees"], (old) =>
        old
          ? old.map((item) => (item.id === id ? { ...item, ...payload } : item))
          : [],
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["employees"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
