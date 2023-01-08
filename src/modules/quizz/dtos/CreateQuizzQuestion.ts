export type CreateQuizzQuestion = {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
  quizzCategoryId: string;
};

export type CreateQuizzQuestionResponse = {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
  quizzCategoryId: string;
};
