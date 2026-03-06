import { Employee } from "../types/employee.type";
import { useCreateEmployee } from "./useCreateEmployee";
import { useGeneratedId } from "../../../hooks/useIdGeneration";
import { useUserContext } from "@/features/users/hooks/useUserContext";
import { useEmployees } from "./useEmployees";
import { EMPLOYEE_PREFIX } from "../constants/constants";

export const useCreateRow = () => {
  const { data } = useEmployees();

  const nextId = useGeneratedId(EMPLOYEE_PREFIX, data);

  const { mutate: postNewProject } = useCreateEmployee(nextId);
  const { user } = useUserContext();

  const handleCreate = async ({
    values,
    exitCreatingMode,
  }: {
    exitCreatingMode: () => void;
    values: Record<string, any>;
  }) => {
    const { id, eqList, ...rest } = values;

    const newEmployee = {
      id: nextId,
      createdBy: user?.name,
      eqList: [],
      ...rest,
    };

    postNewProject(newEmployee as Partial<Employee>);

    exitCreatingMode();
  };

  return handleCreate;
};
