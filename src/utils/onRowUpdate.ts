export const onRowUpdates = <T extends Record<string, any>>(
  original: T,
  changes: Record<string, any>,
  loggedUser: { name: string },
): Partial<T> | undefined => {
  const { Date: _date, eqNr, ...validChanges } = changes;

  const modifiedFields = Object.fromEntries(
    Object.entries(validChanges).filter(
      ([key, value]) => value !== original[key],
    ),
  );

  if (Object.keys(modifiedFields).length === 0) {
    return undefined;
  }

  const newHistoryEntry = {
    name: loggedUser.name,
    modifiedAt: new Date(),
    modifiedFields: Object.fromEntries(
      Object.entries(modifiedFields).map(([key, value]) => [
        key,
        `${original[key]} => ${value}`,
      ]),
    ),
  };

  const payload: any = {
    ...modifiedFields,
    ...(original.id != null ? { id: original.id } : { invNo: original.invNo }),
    modifiedBy: [...(original.modifiedBy || []), newHistoryEntry],
  };

  return payload as unknown as Partial<T>;
};
