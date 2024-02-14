import { Answer } from "../../../types/UserAnswer";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CardDiscussionProps = {
  index: number;
  answer: Answer;
};

const CardDiscussion = ({ answer, index }: CardDiscussionProps) => {
  return (
    <div className="w-full p-4 rounded-lg border shadow-sm mb-2">
      <div className="flex flex-wrap">
        <p className="text-lg font-medium me-1">{index + 1}.</p>
        <div>
          <p className="text-lg font-medium">Question</p>
          <p>{answer.questions}</p>
          <p className="mt-2">
            <span className="text-base font-medium">Answer : </span>
            {answer.answer === "" ? "empty" : answer.answer}{" "}
            {answer.answer === answer.correctAnswer ? (
              <FontAwesomeIcon icon={faCircleCheck} color="#0D9276" />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} color="#DF2E38" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDiscussion;
