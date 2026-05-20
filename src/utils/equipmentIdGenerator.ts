export const equipmentIdGenerator = <T extends { id?: string }>(
  prefix: string,
  category: string,
  data?: T[],
): string => {
  if (!Array.isArray(data) || data.length === 0) {
    return `${prefix}0001`;
  }

  const existingNumbers = Array.from(
    new Set(
      data
        .map((item) => {
          if (!item?.id || !item.id.startsWith(prefix)) return null;
          const match = item.id.match(/\d+$/);
          return match ? Number(match[0]) : null;
        })
        .filter((nr): nr is number => nr !== null),
    ),
  ).sort((a, b) => a - b);

  if (existingNumbers.length === 0) {
    return `${prefix}0001`;
  }

  let nextNumber = 1;

  if (category === "Sisteme-it") {
    const lastNumber = existingNumbers[existingNumbers.length - 1];
    nextNumber = lastNumber + 1;
  } else {
    for (let i = 0; i < existingNumbers.length; i++) {
      if (existingNumbers[i] === nextNumber) {
        nextNumber++;
      } else if (existingNumbers[i] > nextNumber) {
        break;
      }
    }
  }
  const paddedNr = nextNumber.toString().padStart(4, "0");
  return `${prefix}${paddedNr}`;
};
