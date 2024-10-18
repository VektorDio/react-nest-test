import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Question } from './question.schema';

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
