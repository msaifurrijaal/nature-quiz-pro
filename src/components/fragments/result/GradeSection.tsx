import { UserAnswer } from "../../../types/UserAnswer";
import { Question } from "../../../types/QuestionType";
import { useEffect, useState } from "react";
import CardGrade from "../../elements/card/CardGrade";
import CardNotes from "../../elements/card/CardNotes";

type GradeSectionProps = {
  userAnswer: UserAnswer | undefined;
  questions: Question[];
  questionsLocal: string | null;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

const GradeSection = ({
  userAnswer,
  questions,
  questionsLocal,
  setQuestions,
}: GradeSectionProps) => {
  const [emptyAnswer, setEmptyAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  useEffect(() => {
    if (userAnswer == undefined) {
      window.location.href = "/";
    } else {
      let emptyAnswersCount = 0;
      for (const item of userAnswer.answer) {
        if (item.answer === "") {
          emptyAnswersCount++;
        }
      }
      setEmptyAnswer(emptyAnswersCount);
      if (questionsLocal) {
        setQuestions(JSON.parse(questionsLocal));
      }
    }
  }, []);

  useEffect(() => {
    if (questions && userAnswer) {
      for (let i = 0; i < questions.length; i++) {
        const userAns = userAnswer.answer[i].answer;
        const correctAnswer = questions[i].correct_answer;

        if (userAns === correctAnswer) {
          setCorrectAnswer((prev) => prev + 1);
        } else {
          setWrongAnswer((prev) => prev + 1);
        }
      }
    }
  }, [questions]);

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-semibold">Result</h1>
      <div className="flex flex-wrap justify-evenly">
        <CardGrade
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
          wrongAnswer={wrongAnswer}
          emptyAnswer={emptyAnswer}
        />
        <CardNotes
          title="Notes"
          desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam illo
            minima tempora placeat, sit iure qui! Voluptates debitis laboriosam
            provident?"
        />
      </div>
    </>
  );
};

export default GradeSection;
