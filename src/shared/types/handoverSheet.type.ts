export interface HandoverSheet {
  id: string;
  date: Date;
  createdBy: string;
  project: string;
  handoverPerson: string;
  recipientPerson: string;
  eqList: Record<string, any>[];
  filePreview: boolean | undefined;
}
