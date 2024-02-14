import { Answer, UserAnswer } from "../../../types/UserAnswer";
import { Question } from "../../../types/QuestionType";
import CardDiscussion from "../../elements/card/CardDiscussion";

type DiscussionSectionProps = {
  userAnswer: UserAnswer | undefined;
  questions: Question[];
};

const DiscussionSection = ({
  questions,
  userAnswer,
}: DiscussionSectionProps) => {
  return (
    <div className="mt-6">
      {questions &&
        userAnswer &&
        userAnswer.answer.map((answer: Answer, index) => (
          <CardDiscussion answer={answer} index={index} key={index} />
        ))}
    </div>
  );
};

export default DiscussionSection;
