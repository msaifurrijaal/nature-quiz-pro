import { useEffect, useState } from "react";
import Navbar from "../../components/partials/navbar";
import { quizData } from "../../services/quiz/QuizService";
import { Question } from "../../types/QuestionType";
import NavigationNum from "../../components/fragments/quiz/NavigationNum";
import QuestionSection from "../../components/fragments/quiz/QuestionSection";
import { Answer, UserAnswer } from "../../types/UserAnswer";
import Button from "../../components/elements/button";
import { useLocation, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const location = useLocation();
  const status: string | undefined = location.state;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [isChoice, setIsChoice] = useState("");
  const userAns = localStorage.getItem("userAnswer");
  let userAnswerResume: UserAnswer = { answer: [], progress: "start" };
  if (userAns) {
    userAnswerResume = JSON.parse(userAns);
    if (userAnswerResume.progress === "done") {
      userAnswerResume.progress = "start";
    }
  }
  const [userAnswer, setUserAnswer] = useState<UserAnswer>(userAnswerResume);
  const questionsLocal = localStorage.getItem("questions");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await quizData();

      if (result.success) {
        setQuestions(result.data.data.results);
      } else {
      }
    };
    if (questionsLocal && questionsLocal.length > 0) {
      setQuestions(JSON.parse(questionsLocal));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));

    if (status === "resume") {
      setUserAnswer(userAnswerResume);
    } else {
      setIsChoice("");
      const answer: Answer[] = [];
      const userAnswer: UserAnswer = { answer: [], progress: "start" };
      for (const question of questions) {
        answer.push({
          questions: question.question,
          answer: "",
          correctAnswer: question.correct_answer,
        });
      }
      userAnswer.answer = answer;
      setUserAnswer(userAnswer);
    }
    localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
  }, [questions]);

  useEffect(() => {
    if (userAnswer.answer.length > 0) {
      if (userAnswer.answer[index].answer !== "") {
        setIsChoice(userAnswer.answer[index].answer);
      } else {
        setIsChoice("");
      }
    } else {
      setIsChoice("");
    }
  }, [index]);

  useEffect(() => {
    localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
    if (userAnswer.progress === "done") {
      navigate("/result", { state: { userAnswer } });
    }
  }, [userAnswer]);

  const choiceAnswer = (ans: string) => {
    setIsChoice(ans);
    setUserAnswer((prevUserAnswer) => {
      const updatedAnswer = [...prevUserAnswer.answer];
      updatedAnswer[index].answer = ans;

      return {
        ...prevUserAnswer,
        progress: "process",
        answer: updatedAnswer,
      };
    });
  };

  const handleSubmit = () => {
    setUserAnswer((prevUserAnswer) => {
      return {
        ...prevUserAnswer,
        progress: "done",
      };
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-16 md:py-20 px-4 flex flex-wrap">
        <NavigationNum
          userAnswer={userAnswer}
          index={index}
          status={status}
          setIndex={setIndex}
          setUserAnswer={setUserAnswer}
        />
        <QuestionSection
          questions={questions}
          index={index}
          isChoice={isChoice}
          choiceAnswer={choiceAnswer}
        />
        {userAnswer && userAnswer.answer.length > 0 && (
          <div className="w-full flex justify-end">
            <Button
              onClick={handleSubmit}
              classname="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
                  hover:bg-primaryDark transition duration-200"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
