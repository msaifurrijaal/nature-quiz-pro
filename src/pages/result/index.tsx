import { useLocation } from "react-router-dom";
import { UserAnswer } from "../../types/UserAnswer";
import { useEffect, useState } from "react";
import Navbar from "../../components/partials/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Question } from "../../types/QuestionType";

const ResultPage = () => {
  const location = useLocation();
  const userAnswer: UserAnswer | undefined = location.state?.userAnswer;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [emptyAnswer, setEmptyAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  const questionsLocal = localStorage.getItem("questions");

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
      <Navbar />
      <div className="container py-16 md:py-20 px-4">
        <div className="py-4">
          <h1 className="text-2xl md:text-4xl font-semibold">Result</h1>
          {userAnswer && (
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 me-2 min-h-full p-4 rounded-lg border shadow-sm mt-4">
                <p className="text-lg">
                  <FontAwesomeIcon icon={faCheck} />{" "}
                  <span className="font-semibold">
                    Question Answered : {userAnswer.answer.length - emptyAnswer}
                  </span>
                  {}
                </p>
                <p className="text-lg">
                  <FontAwesomeIcon icon={faCircleCheck} />{" "}
                  <span className="font-semibold">
                    Correct Answers : {correctAnswer}
                  </span>
                  {}
                </p>
                <p className="text-lg">
                  <FontAwesomeIcon icon={faCircleXmark} />{" "}
                  <span className="font-semibold">
                    Wrong Answers : {wrongAnswer}
                  </span>
                  {}
                </p>
              </div>
              <div className="w-full md:w-5/12 p-4 min-h-full rounded-lg border shadow-sm mt-4">
                <h3 className="text-xl md:text-2xl font-semibold">Notes</h3>
                <p className="mt-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Totam illo minima tempora placeat, sit iure qui! Voluptates
                  debitis laboriosam provident?
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;