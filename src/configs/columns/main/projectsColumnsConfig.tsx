import { ProjectType } from "@/types/project.type";
import { MRT_ColumnDef } from "material-react-table";
import { PROJECT_STATUS_OPTIONS } from "../../../constants/projectsConstants";
import { Typography } from "@mui/material";
import { ActionableCell } from "@/components/ui/ActionableCell";

export const useMainProjectsTableColumnsConfig =
  (): MRT_ColumnDef<ProjectType>[] => {
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
            basePath="/proiecte"
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
        accessorKey: "address",
        header: "Adresa",
        enableEditing: true,
        size: 250,
      },
      {
        accessorKey: "owner",
        header: "Proprietar",
        enableEditing: true,
        size: 200,
      },
      {
        accessorKey: "teamMembers",
        header: "Echipa",
        enableEditing: false,
        size: 250,
        Cell: ({ cell }) => {
          const team = cell.getValue<string[]>();

          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {team.map((e: any) => (
                <Typography key={e} sx={{ color: "#007bff", fontSize: "13px" }}>
                  {e}
                </Typography>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "eqNo",
        header: "Echipament",
        enableEditing: false,
        size: 50,
        Cell: ({ cell }) => {
          return (
            <Typography sx={{ color: "#007bff", fontSize: "13px" }}>
              {cell.getValue<string>()}
            </Typography>
          );
        },
      },
      {
        accessorKey: "necesarCount",
        header: "Necesar",
        enableEditing: false,
        size: 50,
        Cell: ({ cell }) => {
          return (
            <Typography sx={{ color: "#007bff", fontSize: "13px" }}>
              {cell.getValue<string>()}
            </Typography>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        enableEditing: true,
        size: 100,
        editSelectOptions: PROJECT_STATUS_OPTIONS,
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

              const selectedOption = PROJECT_STATUS_OPTIONS.find(
                (opt) => opt === value,
              );
              return selectedOption ?? value;
            },
          },
        }),
      },
    ];
  };
