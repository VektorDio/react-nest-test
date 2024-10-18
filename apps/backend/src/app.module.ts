import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('DATABASE_URL');
        return {
          uri,
        };
      },
    }),

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
