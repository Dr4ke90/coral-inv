export interface Handover {
  id: string;
  date: Date;
  handoverPerson: string;
  recipientPerson: string;
  project: string;
  refEquipmentList: string[];
}
