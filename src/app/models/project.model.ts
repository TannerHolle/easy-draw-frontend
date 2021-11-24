import { Invoice } from './invoice.model';


export interface Project {
  projectId: String;
  name: String;
  address: String;
  homeOwners: String;
  phone: String;
  email: String;
  budget: Number;
  categories: [];
  invoices: [];
}


