import { useUserContext } from "@/features/users/hooks/useUserContext";

export interface CreateRowOptions<T> {
  mutate: (data: T) => void;
  createEntity: (values: Record<string, any>, userName?: string) => T;
}

export const useCreateRow = <T>({
  mutate,
  createEntity,
}: CreateRowOptions<T>) => {
  const { user } = useUserContext();

  const handleCreate = async ({
    values,
    exitCreatingMode,
  }: {
    values: Record<string, any>;
    exitCreatingMode: () => void;
  }) => {
    const newEntity = createEntity(values, user?.name);

    mutate(newEntity);

    exitCreatingMode();
  };

  return handleCreate;
};
