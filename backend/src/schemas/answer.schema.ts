import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Survey } from './survey.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true })
  survey: Survey;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: { type: String, required: true },
      },
    ],
  })
  responses: {
    question: mongoose.Schema.Types.ObjectId;
    answer: string;
  }[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
