import { onRowUpdates } from "@/utils/onRowUpdate";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";
import { useUser } from "@/contexts/AuthContext";

type UpdateFn<T> = (params: { id: string; payload: Partial<T> }) => void;

export const useUpdateRow = <T extends MRT_RowData & { id?: string }>(
  updateFn: UpdateFn<T>,
) => {
  const { user } = useUser();

  return ({
    table,
    row,
    values,
  }: {
    table: MRT_TableInstance<T>;
    row: MRT_Row<T>;
    values: Record<string, unknown>;
    exitEditingMode: () => void;
  }) => {
    table.setEditingRow(null);
    if (!user) return;

    const originalValues = row.original;

    const changedValues: Record<string, any> = {};

    const uiOnlyFields = [
      "projectName",
      "itemsLength",
      "createdBy",
      "id",
      "custodianName",
      "eqNo",
      "necesarCount",
      "teamMembers",
    ];

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !uiOnlyFields.includes(key)),
    );

    for (const [key, newValue] of Object.entries(filteredValues)) {
      const oldValue = originalValues[key];

      const hasChanged =
        Array.isArray(newValue) && Array.isArray(oldValue)
          ? JSON.stringify(newValue) !== JSON.stringify(oldValue)
          : newValue !== oldValue;

      if (hasChanged) changedValues[key] = newValue;
    }

    if (Object.keys(changedValues).length > 0) {
      const payload = onRowUpdates(row.original, changedValues, user);
      if (payload && originalValues.id) {
        delete (payload as any).id;

        updateFn({ id: originalValues.id, payload });
      }
    }
  };
};
