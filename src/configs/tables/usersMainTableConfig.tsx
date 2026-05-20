import { MRT_TableOptions } from "material-react-table";
import { useUpdateRow } from "@/hooks/rows/useUpdateRow";
import { User } from "@/types/user.type";
import { useCreateRow } from "@/hooks/rows/useCreateRow";
import { useUsers } from "@/hooks/users/useUsers";
import { USER_PREFIX } from "../../constants/usersConstants";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { userFactory } from "../../factories/userFactory";
import { useUser } from "@/contexts/AuthContext";
import { docsIdGenerator } from "@/utils/docsIdGenerator";
import TopToolbarActions from "@/components/layout/TopToolbarActions";

export const useUsersMainTableConfig = (): Partial<MRT_TableOptions<User>> => {
  const { data } = useUsers();
  const nextId = docsIdGenerator(USER_PREFIX, data);
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: postNewUser } = useCreateUser(nextId);
  const { user } = useUser();

  const updateRow = useUpdateRow<User>(updateUser);

  const handleCreate = useCreateRow<Partial<User>>({
    mutate: postNewUser,
    createEntity: (values) => userFactory(values, user!, nextId),
  });

  return {
    onEditingRowSave: updateRow,

    onCreatingRowSave: handleCreate,

    renderTopToolbarCustomActions: ({ table }) => (
      <TopToolbarActions table={table} />
    ),

    createDisplayMode: "row",
  };
};
