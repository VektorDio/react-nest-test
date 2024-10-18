import { Role } from './role.enum';

export class User {
  _id: string;
  email: string;
  password: string;
  role: Role;
  completedSurveys: string[];
}
