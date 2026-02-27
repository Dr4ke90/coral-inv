import { RequirementContext } from "@/features/requirement/RequirementContext";
import { useContext } from "react";

export const useRequirementContext = () => {
  const context = useContext(RequirementContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
