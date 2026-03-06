import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee } from "../types/employee.type";
import { addEmployee } from "../api/addEmployee";

export const useCreateEmployee = (nextId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["employees"] });

      const previous = queryClient.getQueryData<Employee[]>(["employees"]);

      queryClient.setQueryData<Employee[]>(["employees"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as Employee]
          : [{ ...newSheet, id: nextId } as Employee],
      );

      return { previous };
    },
    onError: (_err, _newSheet, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["employees"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
