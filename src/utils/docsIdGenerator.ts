export const docsIdGenerator = <T extends { id: string }>(
  prefix: string,
  data?: T[],
): string => {
  if (!data || data.length === 0) return `${prefix}0001`;

  const maxNr = data.reduce((max, item) => {
    const currentNr = parseInt(item.id.replace(prefix, ""), 10);
    return currentNr > max ? currentNr : max;
  }, 0);

  const nextNr = maxNr + 1;
  const paddedNr = nextNr.toString().padStart(4, "0");
  return `${prefix}${paddedNr}`;
};
