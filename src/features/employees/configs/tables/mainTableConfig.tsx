import { MRT_TableOptions } from "material-react-table";
import DetailsPanel from "../../components/DetailsPanel";
import TopToolbarActions from "../../components/TopToolbarActions";
import { useUpdateRow } from "@/hooks/useUpdateRow";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { Employee } from "../../types/employee.type";
import { useCreateRow } from "../../hooks/useCreateRow";

export const useMainTableConfig = (): Partial<MRT_TableOptions<Employee>> => {
  const { mutate: updateEmployee } = useUpdateEmployee();
  const updateRow = useUpdateRow<Employee>(updateEmployee);

  const handleCreate = useCreateRow();

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
