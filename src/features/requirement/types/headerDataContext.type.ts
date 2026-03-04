import { Requirement } from "./requirementInterface";

export interface HeaderDataContextType {
  headerData: Partial<Requirement>;
  setHeaderValues: (values: Partial<Requirement>) => void;
  resetHeader: () => void;
}
