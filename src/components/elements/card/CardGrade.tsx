import {
  faCheck,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserAnswer } from "../../../types/UserAnswer";

type CardGradeProps = {
  userAnswer: UserAnswer | undefined;
  correctAnswer: number;
  emptyAnswer: number;
  wrongAnswer: number;
};

const CardGrade = ({
  userAnswer,
  correctAnswer,
  emptyAnswer,
  wrongAnswer,
}: CardGradeProps) => {
  return (
    <div className="w-full md:w-6/12 min-h-full p-4 rounded-lg border shadow-sm mt-4">
      <p className="text-lg">
        <FontAwesomeIcon icon={faCheck} />{" "}
        <span className="font-semibold">
          Question Answered :{" "}
          {userAnswer && userAnswer.answer.length - emptyAnswer}
        </span>
        {}
      </p>
      <p className="text-lg">
        <FontAwesomeIcon icon={faCircleCheck} color="#0D9276" />{" "}
        <span className="font-semibold">Correct Answers : {correctAnswer}</span>
        {}
      </p>
      <p className="text-lg">
        <FontAwesomeIcon icon={faCircleXmark} color="#DF2E38" />{" "}
        <span className="font-semibold">Wrong Answers : {wrongAnswer}</span>
        {}
      </p>
    </div>
  );
};

export default CardGrade;
