export const generatedId = <T>(prefix: string, data?: T[]): string => {
  const nextNr = (data?.length ?? 0) + 1;
  const paddedNr = nextNr.toString().padStart(4, "0");
  return prefix + paddedNr;
};
