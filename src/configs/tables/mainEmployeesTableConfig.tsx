import { MRT_TableOptions } from "material-react-table";
import { useUpdateRow } from "@/hooks/rows/useUpdateRow";
import { useCreateEmployee } from "@/hooks/employees/useCreateEmployee";
import { useCreateRow } from "@/hooks/rows/useCreateRow";
import { EMPLOYEE_PREFIX } from "@/constants/employeeConstants";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { EmployeeType } from "@/types/employee.type";
import { useUpdateEmployee } from "@/hooks/employees/useUpdateEmployee";
import TopToolbarActions from "@/components/layout/TopToolbarActions";
import DetailsPanel from "@/components/layout/DetailsPanel";
import { detailsTableConfig } from "./generalConfigs/detailsTableConfig";
import { useUser } from "@/contexts/AuthContext";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import { employeeFactory } from "@/factories/employeeFactory";
import { detailsEquipmentColumnsConfig } from "../columns/detailsPanel/detailsEquipColumnsConfig";

export const useMainEmployeesTableConfig = (): Partial<
  MRT_TableOptions<EmployeeType>
> => {
  const { data } = useEmployees();
  const nextId = docsIdGenerator(EMPLOYEE_PREFIX, data);
  const { mutate: updateEmployee } = useUpdateEmployee();
  const { data: equipment } = useEquipment();
  const { mutate: postNewEmployee } = useCreateEmployee(nextId);
  const { user } = useUser();

  const updateRow = useUpdateRow<EmployeeType>(updateEmployee);

  const handleCreate = useCreateRow<Partial<EmployeeType>>({
    mutate: postNewEmployee,
    createEntity: (values) => employeeFactory(values, user?.name, nextId),
  });

  return {
    onEditingRowSave: updateRow,

    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    renderDetailPanel: ({ row }) => {
      const mappedEquipments = equipment?.filter(
        (e: any) => e.custodianId === row.original.id,
      );

      if (mappedEquipments?.length === 0) return null;

      return (
        <DetailsPanel
          items={mappedEquipments ?? []}
          columns={detailsEquipmentColumnsConfig}
          tableConfig={detailsTableConfig}
        />
      );
    },

    createDisplayMode: "row",
  };
};
