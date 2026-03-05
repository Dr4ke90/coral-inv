"use Client";
import Table from "@/shared/components/table/Table";
import { RequirementType } from "../types/requiment.type";
import { mainRequirementColumnsConfing } from "../configs/columns/mainTableColumnsConfig";
import { mainTableConfig } from "../configs/tables/mainTableConfig";
import { MRT_TableOptions } from "material-react-table";

export const MainRequirementTable = ({
  data,
  onEdit,
}: {
  data: RequirementType[];
  onEdit: MRT_TableOptions<RequirementType>["onEditingRowSave"];
}) => (
  <Table
    columns={mainRequirementColumnsConfing}
    data={data}
    tableCustomOptions={mainTableConfig(onEdit)}
  />
);
