export interface HandoverSheet {
  id: string;
  date: Date;
  project: string;
  handoverPerson: string;
  recipientPerson: string;
  eqList: Record<string, any>[];
  filePreview: boolean | undefined;
}
