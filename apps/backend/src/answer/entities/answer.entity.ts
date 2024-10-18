export class Answer {
  _id: string;
  surveyId: string;
  userId: string;
  response: {
    questionId: string;
    answer: string;
  }[];
}
