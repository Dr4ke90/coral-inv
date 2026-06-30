export interface EntryType {
  id: string;
  type: string;
  date: Date | string;
  sn: string;
  vendor: string;
  total: number;
  filePreview: boolean;
  items: string[];
  requirementId: string;
  createdBy: string;
  createdAt: Date;
  rqOptions: string[];
}
