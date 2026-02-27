import { RequirementStatus } from "@/features/requirement/types/requirementStatus";

export const STATUS_COLOR_MAP: Record<RequirementStatus, string> = {
  Aprobat: "success.dark",
  "In asteptare": "warning.light",
  Respins: "error.dark",
  Null: "grey.500",
};
