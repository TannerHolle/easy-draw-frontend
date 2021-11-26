import { Category } from './category.model';
import { Draw } from './draw.model';


export interface Project {
  _id: string;
  name: string;
  address: string;
  homeOwners: string;
  phone: string;
  email: string;
  budget: number;
  categories: Array<any>;
  draws: Array<any>;
}


