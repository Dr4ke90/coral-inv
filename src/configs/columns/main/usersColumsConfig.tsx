"use client";
import { MRT_ColumnDef } from "material-react-table";
import { User } from "@/types/user.type";
import { USER_ROLES } from "../../../constants/usersConstants";

export const useUsersMainColumnsConfig = (): MRT_ColumnDef<User>[] => {
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
      accessorKey: "username",
      header: "Username",
      enableEditing: true,
      size: 250,
    },
    {
      accessorKey: "password",
      header: "Parola",
      enableEditing: true,
      size: 200,
    },
    {
      accessorKey: "role",
      header: "Rol",
      size: 200,
      editSelectOptions: USER_ROLES,
      muiEditTextFieldProps: {
        select: true,
      },
    },
  ];
};
