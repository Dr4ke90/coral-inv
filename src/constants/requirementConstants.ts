import { RequirementStatus } from "../types/requirementStatus";

export const REQUIRMENTS_PREFIX = "N";

export const REQUIREMENT_STATUS_OPTIONS: RequirementStatus[] = [
  "In asteptare",
  "Aprobat",
  "Respins",
  "Null",
];

export const STATUS_COLOR_MAP: Record<RequirementStatus, string> = {
  Aprobat: "success.dark",
  "In asteptare": "warning.light",
  Respins: "error.dark",
  Null: "grey.500",
  "": "",
};
