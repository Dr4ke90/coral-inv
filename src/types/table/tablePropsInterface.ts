import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";

export interface CustomTableProps<T extends Record<string, any>> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  customOptions?: Partial<MRT_TableOptions<T>>;
  onEditingRowSave?: MRT_TableOptions<T>["onEditingRowSave"];
}
