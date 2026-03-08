import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export const createEmployee = (
  values: Record<string, any>,
  userName: string | undefined,
  nextId: string,
): Partial<HandoverSheet> => {
  const { id, eqList, ...rest } = values;

  return {
    id: nextId,
    handoverPerson: userName,
    eqList: [],
    ...rest,
  };
};
