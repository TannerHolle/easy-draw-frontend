import { Invoice } from './invoice.model';


export interface Project {
  id: String;
  name: String;
  address: String;
  homeOwners: String;
  phone: String;
  email: String;
  budget: Number;
  invoices: Invoice[];
}


