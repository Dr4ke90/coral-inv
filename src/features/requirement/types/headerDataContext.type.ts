import { RequirementType } from "./requiment.type";

export interface HeaderDataContextType {
  headerData: Partial<RequirementType>;
  setHeaderValues: (values: Partial<RequirementType>) => void;
  resetHeader: () => void;
}
