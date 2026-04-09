"use client";
import MultiSelect from "@/components/ui/MultiSelect";
import { Employee } from "@/features/employees/types/employee.type";
import { useEquipment } from "@/hooks/useEquipment";
import { useProjects } from "@/hooks/useProjects";
import { Autocomplete, TextField } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { EMPLOYEE_STATUS_OPTIONS } from "../../constants/constants";

export const useMainTableColumsConfig = (): MRT_ColumnDef<Employee>[] => {
  const { data: equipment } = useEquipment();
  const { data: projects } = useProjects();

  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 30,
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Nume",
      size: 200,
      enableEditing: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableEditing: true,
      size: 250,
    },
    {
      accessorKey: "telNo",
      header: "Telefon",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "position",
      header: "Functie",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "projects",
      header: "Proiecte",
      enableEditing: true,
      enableClickToCopy: false,

      Edit: ({ cell, row, column }) => {
        const projectIds = cell.getValue<string[]>() || [];
        const selectedObjects =
          projects?.filter((p: any) => projectIds.includes(p.id)) || [];

        return (
          <MultiSelect
            name={column.id}
            options={projects!}
            value={selectedObjects}
            placeholder="Proiect"
            onChange={(_, value) => {
              const newValue = value.map((v: any) => v.id);

              row._valuesCache[column.id] = newValue;
            }}
          />
        );
      },

      Cell: ({ cell }) => {
        const projectIds = cell.getValue<string[]>() || [];
        if (!projectIds.length) return null;

        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {projectIds.slice(0, 3).map((id) => (
              <span key={id}>
                {projects?.find((p: any) => p.id === id)?.name}
              </span>
            ))}
            {projectIds.length > 3 && (
              <span>... + încă {projectIds.length - 3}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableEditing: true,
      size: 200,
      editSelectOptions: EMPLOYEE_STATUS_OPTIONS,
      muiEditTextFieldProps: () => ({
        select: true,
        InputLabelProps: { shrink: true, style: { display: "none" } },
        SelectProps: {
          displayEmpty: true,
          renderValue: (value: any) => {
            if (value === undefined || value === null || value === "") {
              return (
                <span style={{ color: "#757575", fontWeight: 400 }}>
                  Status
                </span>
              );
            }

            const selectedOption = EMPLOYEE_STATUS_OPTIONS.find(
              (opt) => opt === value,
            );
            return selectedOption ? selectedOption : value;
          },
        },
      }),
    },
    {
      id: "eqNr",
      header: "Nr. echip.",
      enableEditing: false,
      size: 100,
      Cell: ({ row }) => {
        const eqList = equipment?.filter(
          (eq: any) => eq.custodianId === row.original.id,
        );

        return eqList ? eqList.length : 0;
      },
    },
  ];
};
