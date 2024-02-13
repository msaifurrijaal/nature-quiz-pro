import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useIsUserLogin } from "../../../context/IsLogin";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { quizData } from "../../../services/quiz/QuizService";
import { UserAnswer } from "../../../types/UserAnswer";

const HeroSection = () => {
  const questions = localStorage.getItem("questions");
  const userAns = localStorage.getItem("userAnswer");
  let userAnswer: UserAnswer = { answer: [], progress: "start" };
  if (userAns) {
    userAnswer = JSON.parse(userAns);
  }
  const [isLoading, setIsLoading] = useState(false);

  const refreshQuestions = async () => {
    setIsLoading(true);
    const result = await quizData();

    if (result.success) {
      setIsLoading(false);
      localStorage.removeItem("userAnswer");
      localStorage.setItem(
        "questions",
        JSON.stringify(result.data.data.results)
      );
    } else {
      setIsLoading(false);
      console.log(result.data);
    }
  };

  const { isUserLogin } = useIsUserLogin();
  return (
    <div className="container py-16 md:py-20 min-h-screen flex flex-col justify-center items-center px-4">
      <img
        src="/images/hero.png"
        alt="Hero Images"
        className="max-w-80 sm:max-w-96"
      />
      <h2 className="text-2xl text-center sm:text-4xl md:text-5xl font-bold mt-2 md:mt-4 flex text-primary justify-center">
        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Unleash Your Inner Naturalist with Us!")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Quiz Science and Nature")
              .pauseFor(1000)
              .deleteAll()
              .start();
          }}
        />
      </h2>
      <p className="mt-6 text-center text-sm md:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        <br /> Commodi modi nihil doloremque quod consequatur velit?
        <br />
        Sed molestias itaque saepe adipisci.
      </p>
      {!isUserLogin && (
        <Link
          to="/login"
          className="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
          hover:bg-primaryDark transition duration-200 mt-6"
        >
          Get Started
        </Link>
      )}
      <div className="flex justify-center items-center">
        {isUserLogin && (
          <Link
            to="/quiz"
            className="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
          hover:bg-primaryDark transition duration-200 mt-6 me-1"
          >
            Start Quiz
          </Link>
        )}
        {isUserLogin && userAnswer && userAnswer.progress === "process" && (
          <Link
            to="/quiz"
            state="resume"
            className="font-medium text-base bg-white text-primary border border-primary rounded-md py-2 px-4 
          hover:bg-slate-100 hover:border-primaryDark hover:text-primaryDark transition duration-200 mt-6 ms-1"
          >
            Resume Quiz
          </Link>
        )}
      </div>

      {isUserLogin && questions && (
        <Link
          to=""
          aria-disabled={isLoading}
          onClick={() => refreshQuestions()}
          className="font-medium text-base bg-yellow-500 text-white rounded-md py-2 px-4 
          hover:bg-yellow-300 transition duration-200 mt-2"
        >
          <FontAwesomeIcon icon={faRefresh} />{" "}
          {isLoading ? "Loading...." : "Refresh Questions"}
        </Link>
      )}
    </div>
  );
};

export default HeroSection;
