export interface HandoverSheet {
  id: string;
  date: Date | string;
  createdBy: string;
  projectId: string;
  handoverPersonId: string;
  recipientPersonId: string;
  eqList: string[];
  filePreview: boolean | undefined;
}
