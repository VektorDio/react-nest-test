import { Question } from '../../question/entities/question.entity';
import { User } from '../../schemas/user.schema';

export class Survey {
  _id: string;
  name: string;
  questions: Question[];
  usersId: User[];
}
