import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], required: true })
  options: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
