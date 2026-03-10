import { useUserContext } from "@/features/users/hooks/useUser";
import { onRowUpdates } from "@/shared/utils/onRowUpdate";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";

type UpdateFn<T> = (params: { id: string; payload: Partial<T> }) => void;

export const useUpdateRow = <T extends MRT_RowData>(updateFn: UpdateFn<T>) => {
  const { user } = useUserContext();

  return ({
    table,
    row,
    values,
  }: {
    table: MRT_TableInstance<T>;
    row: MRT_Row<T>;
    values: Record<string, unknown>;
  }) => {
    if (!user) {
      table.setEditingRow(null);
      return;
    }

    const updates = onRowUpdates(row, values, user);

    if (!updates) {
      table.setEditingRow(null);
      return;
    }

    updateFn({ id: row.original.id, payload: updates });

    table.setEditingRow(null);
  };
};
