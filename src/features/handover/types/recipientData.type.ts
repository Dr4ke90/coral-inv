import { HandoverSheet } from "@/shared/types/handoverSheet.type";

export interface RecipientDataType {
  recipientData: Partial<HandoverSheet>;
  setRecipientPerson: (data: Partial<HandoverSheet>) => void;
  resetRecipient: () => void;
}
