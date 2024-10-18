import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forRoot('mongodb+srv:// vektordiod:1SjJkgYckdgbwhlR@nest-test. u2p1v. mongodb. net/?retryWrites=true&w=majority&appName=nest-test'),
    UserModule,
    SurveyModule,
    QuestionModule,
    AnswerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
