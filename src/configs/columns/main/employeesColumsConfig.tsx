"use client";
import MultiSelect from "@/components/ui/MultiSelect";
import { EmployeeType } from "@/types/employee.type";
import { useProjects } from "@/hooks/projects/useProjects";
import { MRT_ColumnDef } from "material-react-table";
import { EMPLOYEE_STATUS_OPTIONS } from "../../../constants/employeeConstants";
import { ActionableCell } from "@/components/ui/ActionableCell";
import { Typography } from "@mui/material";

export const useMainEmployeesTableColumsConfig =
  (): MRT_ColumnDef<EmployeeType>[] => {
    const { data: projects } = useProjects();

    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 30,
        enableEditing: false,
        Cell: ({ cell }) => (
          <ActionableCell
            value={cell.getValue<string>()}
            targetId={cell.getValue<string>()}
            fontSize="14px"
            basePath="/angajati"
          />
        ),
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
        size: 100,
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
              return selectedOption ?? value;
            },
          },
        }),
      },
      {
        accessorKey: "eqNo",
        header: "Nr. echip.",
        enableEditing: false,
        enableClickToCopy: false,
        size: 50,
        Cell: ({ cell }) => {
          return (
            <Typography sx={{ color: "#007bff", fontSize: "15px" }}>
              {cell.getValue<string>()}
            </Typography>
          );
        },
      },
    ];
  };
