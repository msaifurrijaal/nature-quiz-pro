export interface UserAnswer {
  answer: Answer[];
  isDone: boolean;
}

export interface Answer {
  questions: string;
  answer: string;
}
