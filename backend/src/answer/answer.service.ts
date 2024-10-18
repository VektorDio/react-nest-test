import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from '../schemas/answer.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    const userId = createAnswerDto.user
    await this.userModel.updateOne({ _id: userId }, { $push: { completedSurveys: createAnswerDto.survey } })
    return this.answerModel.create(createAnswerDto);
  }
}
