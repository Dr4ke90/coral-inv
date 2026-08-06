export const normalizeString = (value: unknown): string => {
  let text = "";

  if (typeof value === "string") {
    text = value;
  } else if (Array.isArray(value)) {
    text = value
      .filter((item): item is string => typeof item === "string")
      .join("\n");
  }

  const normalized = text.replace(/\r\n?/g, "\n");

  return normalized.trim().length === 0 ? "" : normalized;
};