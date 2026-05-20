export const onRowUpdates = <T extends Record<string, any>>(
  original: T,
  changes: Record<string, any>,
  loggedUser: { name: string },
): Partial<T> | undefined => {
  const { Date: _date, ...validChanges } = changes;

  const logs = Object.fromEntries(
    Object.entries(validChanges).filter(
      ([key, value]) => value !== original[key],
    ),
  );

  if (Object.keys(logs).length === 0) {
    return undefined;
  }

  const newHistoryEntry = {
    name: loggedUser.name,
    modifiedAt: new Date(),
    modifiedFields: Object.fromEntries(
      Object.entries(logs).map(([key, value]) => [
        key,
        `${original[key]} => ${value}`,
      ]),
    ),
  };

  const payload: any = {
    ...logs,
    ...(original.id != null ? { id: original.id } : { invNo: original.invNo }),
    logs: [...(original.logs || []), newHistoryEntry],
  };

  return payload as unknown as Partial<T>;
};
