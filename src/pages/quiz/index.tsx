import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/partials/navbar";
import { quizData } from "../../services/quiz/QuizService";
import { Question } from "../../types/QuestionType";
import NavigationNum from "../../components/fragments/quiz/NavigationNum";
import QuestionSection from "../../components/fragments/quiz/QuestionSection";
import { Answer, UserAnswer } from "../../types/UserAnswer";
import Button from "../../components/elements/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Time } from "../../types/Time";

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
  const [timer, setTimer] = useState<string>("00:00:00");
  const Ref = useRef<number | null>(null);

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

    if (questionsLocal && questionsLocal.length > 0) {
      setQuestions(JSON.parse(questionsLocal));
    } else {
      fetchData();
    }

    clearTimer(getDeadTime());

    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));

    if (status === "resume") {
      console.log("resume");
      setUserAnswer(userAnswerResume);
    } else {
      console.log("restart");
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
    console.log(userAnswer);
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

  const getTimeRemaining = (endTime: Date): Time => {
    const total =
      Date.parse(endTime.toISOString()) - Date.parse(new Date().toISOString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startTimer = (endTime: Date) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      const formattedTimer =
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);

      localStorage.setItem("remainingSeconds", total.toString());

      setTimer(formattedTimer);
    } else {
      setUserAnswer((prevUserAnswer) => {
        return {
          ...prevUserAnswer,
          progress: "done",
        };
      });
    }
  };

  const clearTimer = (endTime: Date) => {
    setTimer("00:00:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (): Date => {
    const deadline = new Date();
    if (status === "resume") {
      const miliSeconds = Number(localStorage.getItem("remainingSeconds"));
      const seconds = Math.floor(miliSeconds / 1000);
      deadline.setSeconds(deadline.getSeconds() + seconds);
    } else {
      deadline.setSeconds(deadline.getSeconds() + 600);
    }
    return deadline;
  };

  return (
    <div>
      <Navbar />
      <div className="container py-16 md:py-20 px-4 flex flex-wrap">
        <NavigationNum
          questions={questions}
          index={index}
          timer={timer}
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
