export interface HandoverSheet {
  id: string;
  date: Date;
  createdBy: string;
  projectId: string;
  handoverPersonId: string;
  recipientPersonId: string;
  eqList: string[];
  filePreview: boolean | undefined;
}
