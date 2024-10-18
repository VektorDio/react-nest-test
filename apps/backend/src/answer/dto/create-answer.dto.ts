export class CreateAnswerDto {
  survey: string;
  user: string;
  response: {
    question: string;
    answer: string;
  }[];
}
