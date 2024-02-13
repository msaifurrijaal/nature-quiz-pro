export interface UserAnswer {
  answer: Answer[];
  progress: string;
}

export interface Answer {
  questions: string;
  answer: string;
  correctAnswer: string;
}
