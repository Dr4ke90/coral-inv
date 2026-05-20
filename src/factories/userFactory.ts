import { User } from "@/types/user.type";

export const userFactory = (
  values: Record<string, any>,
  user: User,
  nextId: string,
): Partial<User> => {
  const { id, ...rest } = values;

  return {
    id: nextId,
    createdBy: user?.id,
    ...rest,
  };
};
