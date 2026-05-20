import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeType } from "../../types/employee.type";
import { addEmployee } from "../../api/employees/addEmployee";

export const useCreateEmployee = (nextId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onMutate: async (newSheet) => {
      await queryClient.cancelQueries({ queryKey: ["employees"] });

      const previous = queryClient.getQueryData<EmployeeType[]>(["employees"]);

      queryClient.setQueryData<EmployeeType[]>(["employees"], (old) =>
        old
          ? [...old, { ...newSheet, id: nextId } as EmployeeType]
          : [{ ...newSheet, id: nextId } as EmployeeType],
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
