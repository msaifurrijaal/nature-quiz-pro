import { useEffect, useState } from "react";
import Navbar from "../../components/partials/navbar";
import { quizData } from "../../services/quiz/QuizService";
import { Question } from "../../types/QuestionType";
import NavigationNum from "../../components/fragments/quiz/NavigationNum";
import QuestionSection from "../../components/fragments/quiz/QuestionSection";
import { Answer, UserAnswer } from "../../types/UserAnswer";
import Button from "../../components/elements/button";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [isChoice, setIsChoice] = useState("");
  const [userAnswer, setUserAnswer] = useState<UserAnswer>({
    answer: [],
    isDone: false,
  });
  const questionsLocal = localStorage.getItem("questions");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await quizData();

      if (result.success) {
        console.log(result.data.data.results);
        setQuestions(result.data.data.results);
      } else {
        console.log(result.data);
      }
    };

    if (questionsLocal) {
      setQuestions(JSON.parse(questionsLocal));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
    const answer: Answer[] = [];
    const userAnswer: UserAnswer = { answer: [], isDone: false };
    for (const question of questions) {
      answer.push({
        questions: question.question,
        answer: "",
      });
    }
    userAnswer.answer = answer;
    setUserAnswer(userAnswer);
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
    if (userAnswer.isDone) {
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
        answer: updatedAnswer,
      };
    });
  };

  const handleSubmit = () => {
    setUserAnswer((prevUserAnswer) => {
      return {
        ...prevUserAnswer,
        isDone: true,
      };
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-16 md:py-20 px-4 flex flex-wrap">
        <NavigationNum
          questions={questions}
          index={index}
          setIndex={setIndex}
        />
        <QuestionSection
          questions={questions}
          index={index}
          isChoice={isChoice}
          choiceAnswer={choiceAnswer}
        />
        <div className="w-full flex justify-end">
          <Button
            onClick={handleSubmit}
            classname="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
                  hover:bg-primaryDark transition duration-200"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
