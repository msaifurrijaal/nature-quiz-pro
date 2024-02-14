import { useLocation } from "react-router-dom";
import { UserAnswer } from "../../types/UserAnswer";
import { useState } from "react";
import Navbar from "../../components/partials/navbar";
import { Question } from "../../types/QuestionType";
import GradeSection from "../../components/fragments/result/GradeSection";
import DiscussionSection from "../../components/fragments/result/DiscussionSection";

const ResultPage = () => {
  const location = useLocation();
  const userAnswer: UserAnswer | undefined = location.state?.userAnswer;
  const [questions, setQuestions] = useState<Question[]>([]);

  const questionsLocal = localStorage.getItem("questions");

  return (
    <>
      <Navbar />
      <div className="container py-16 md:py-20 px-4">
        <div className="py-4">
          <GradeSection
            userAnswer={userAnswer}
            questions={questions}
            questionsLocal={questionsLocal}
            setQuestions={setQuestions}
          />
          <DiscussionSection userAnswer={userAnswer} questions={questions} />
        </div>
      </div>
    </>
  );
};

export default ResultPage;
