import mongoose from 'mongoose';

export class CreateQuestionDto {
  text: string;
  options: string[];
  survey: mongoose.Schema.Types.ObjectId;
}
