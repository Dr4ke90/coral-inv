import { HandoverSheet } from "@/types/handoverSheet.type";

export interface HeaderDataContextType {
  headerData: Partial<HandoverSheet>;
  resetHeader: () => void;
}
