import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { Employee } from "../../types/employee.type";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { useUser } from "@/features/users/hooks/useUser";
import { useCreateRow } from "@/hooks/useCreateRow";
import { generatedId } from "@/utils/generateId";
import { EMPLOYEE_PREFIX } from "../../constants/constants";
import { createEmployee } from "../../factories/createEmployee";
import { useEmployees } from "@/hooks/useEmployees";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Employee>> => {
  const { data } = useEmployees();
  const nextId = generatedId(EMPLOYEE_PREFIX, data);
  const { mutate: updateEmployee } = useUpdateEmployee();
  const { mutate: postNewEmployee } = useCreateEmployee(nextId);
  const { user } = useUser();

  const updateRow = useUpdateRow<Employee>(updateEmployee);

  const handleCreate = useCreateRow<Partial<Employee>>({
    mutate: postNewEmployee,
    createEntity: (values) => createEmployee(values, user?.name, nextId),
  });

  return {
    onEditingRowSave: updateRow,
    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    renderDetailPanel: ({ row }) => {
      if (row.original.eqList?.length === 0) return null;

      return <DetailsPanel row={row} />;
    },

    createDisplayMode: "row",
  };
};
