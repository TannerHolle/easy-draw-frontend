import { Invoice } from './invoice.model';


export interface Draw {
  name: String;
  isOpen: String;
  invoices: Invoice[];

}
