export const generatedSubId = <T>(prefix: string, data?: T[]): string => {
  const nextNr = (data?.length ?? 0) + 1;
  const paddedNr = nextNr.toString().padStart(3, "0");
  return `${prefix}.${paddedNr}`;
};
