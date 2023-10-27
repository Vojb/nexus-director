type Question = {
  answer: string;
  question: string | null;
  id: string;
  correctMarker: {
    id: string;
    points: number;
  };
  questionNumber: number;
  questionType: string;
  showAnswer: boolean;
  showMarker: boolean;
};
