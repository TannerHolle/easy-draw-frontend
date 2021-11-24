import { Invoice } from './invoice.model';
import { Category } from './category.model';
import { Draw } from './draw.model';


export interface Project {
  projectId: String;
  name: String;
  address: String;
  homeOwners: String;
  phone: String;
  email: String;
  budget: Number;
  categories: Category[];
  draws: Draw[];
}


