export interface Project {
  id: string;
  name: string;
  address: string;
  owner: string;
  team: string[];
  eqList: string[];
  rqList: string[];
  createdBy: string | undefined;
  status: string;
}
