import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from '../schemas/survey.schema';
import { Answer, AnswerDocument } from '../schemas/answer.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Question } from '../schemas/question.schema';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Question.name) private questionModel: Model<AnswerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.surveyModel.find().exec();
  }

  async getSurveyIdsAndNames() {
    return this.surveyModel.find({}, '_id name').exec();
  }

  async getSurveyById(userId: string, surveyId: string) {
    const user = await this.userModel.findById(userId)
    const survey = await this.surveyModel
      .findById(surveyId)
      .populate('questions')
      .exec();

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    // @ts-ignore
    if (user.completedSurveys.includes(surveyId)) {
      throw new UnauthorizedException(
        'You already completed this survey',
      );
    }

    return survey;
  }

  async getSurveyAnswersAndQuestions(user: User, surveyId: string) {
    if (user.role !== 'admin') {
      throw new UnauthorizedException('Only admin can access survey answers');
    }

    return this.answerModel
      .find({ survey: surveyId })
      .populate('user', 'email')
      .populate({
        path: 'responses.question',
        select: 'text',
      })
      .exec();
  }
}
