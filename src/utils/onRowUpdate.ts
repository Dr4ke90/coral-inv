import { MRT_Row } from "material-react-table";

export const onRowUpdates = <T extends Record<string, any>>(
  row: MRT_Row<T>,
  values: Record<string, unknown>,
  loggedUser: { name: string },
): Partial<T> | undefined => {
  const original = row.original;
  const updates = { ...values };

  delete updates.Date;
  delete updates.eqNr;

  const modifiedFields = Object.fromEntries(
    Object.entries(updates).filter(([key, value]) => value !== original[key]),
  );

  if (Object.keys(modifiedFields).length === 0) {
    console.log("Nu există modificări.");
    return;
  }

  const savedUpdates = {
    ...modifiedFields,
    ...(original.id !== undefined && original.id !== null
      ? { id: original.id }
      : { invNo: original.invNo }),
    modifiedBy: [
      ...original.modifiedBy,
      {
        name: loggedUser.name,
        modifiedAt: new Date(),
        modifiedFields: Object.fromEntries(
          Object.entries(modifiedFields).map(([key, value]) => [
            key,
            `${original[key]} => ${value}`,
          ]),
        ),
      },
    ],
  };
  return savedUpdates as unknown as Partial<T>;
};
