import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllSurveys() {
    return this.surveyService.findAll();
  }

  @Get('ids')
  @UseGuards(AuthGuard)
  async getSurveyIdsAndNames() {
    return this.surveyService.getSurveyIdsAndNames();
  }

  @Get(':surveyId')
  @UseGuards(AuthGuard)
  async getSurveyById(@Req() req, @Param('surveyId') surveyId: string) {
    const userId = req.user._id;
    return this.surveyService.getSurveyById(userId, surveyId);
  }

  @Get(':surveyId/answers')
  @UseGuards(AuthGuard)
  async getSurveyAnswersAndQuestions(
    @Req() req,
    @Param('surveyId') surveyId: string,
  ) {
    const user = req.user;
    return this.surveyService.getSurveyAnswersAndQuestions(user, surveyId);
  }
}
