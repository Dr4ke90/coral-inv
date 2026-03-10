import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export interface HeaderDataContextType {
  headerData: Partial<HandoverSheet>;
  resetHeader: () => void;
}
