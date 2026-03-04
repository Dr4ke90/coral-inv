"use Client";
import Table from "@/shared/components/table/Table";
import { Requirement } from "../types/requirementInterface";
import { mainRequirementColumnsConfing } from "../configs/columns/rqMainColumnsConfig";
import { mainTableConfig } from "../configs/tables/mainTableConfig";
import { MRT_TableOptions } from "material-react-table";

const MainRequirementTable = ({
  data,
  onEdit,
}: {
  data: Requirement[];
  onEdit: MRT_TableOptions<Requirement>["onEditingRowSave"];
}) => (
  <Table
    columns={mainRequirementColumnsConfing}
    data={data}
    tableCustomOptions={mainTableConfig(onEdit)}
  />
);

export default MainRequirementTable;
