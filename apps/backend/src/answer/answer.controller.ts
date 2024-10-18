import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createAnswer(createAnswerDto);
  }
}
