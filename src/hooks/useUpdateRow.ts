import { useUser } from "@/features/users/hooks/useUser";
import { onRowUpdates } from "@/utils/onRowUpdate";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";

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
  }) => {
    table.setEditingRow(null);

    if (!user) return;

    const originalValues = row.original;
    const changedValues: Record<string, any> = {};

    for (const [key, newValue] of Object.entries(values)) {
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
        updateFn({ id: originalValues.id, payload });
      }
    }
  };
};
