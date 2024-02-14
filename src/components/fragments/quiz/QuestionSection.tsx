import { Question } from "../../../types/QuestionType";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type QuestionSectionProps = {
  questions: Question[];
  index: number;
  isChoice: string;
  choiceAnswer: (ans: string) => void;
};

const QuestionSection = ({
  questions,
  index,
  isChoice,
  choiceAnswer,
}: QuestionSectionProps) => {
  return (
    <div className="w-full md:w-2/3 py-4">
      {questions && questions.length > 0 ? (
        <div className="w-full rounded-lg border shadow-sm p-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Question {index + 1}
            </h3>
            <p className="text-base mt-2">{questions[index].question}</p>
            <form action="" className="mt-6">
              <div className="flex">
                <div
                  className={`rounded-lg font-medium ${
                    isChoice === "True"
                      ? "bg-primary border border-primary text-white"
                      : "bg-slate-50 border border-primary text-black"
                  } py-2 px-4 me-2`}
                >
                  <input
                    type="radio"
                    id="true"
                    name="option"
                    value="True"
                    className="mb-3 hidden"
                    onChange={(e) => choiceAnswer(e.target.value)}
                    checked={isChoice === "True"}
                  />
                  <label htmlFor="true" className="cursor-pointer">
                    True
                  </label>
                  <br />
                </div>
                <div
                  className={`rounded-lg font-medium ${
                    isChoice === "False"
                      ? "bg-primary border border-primary text-white"
                      : "bg-slate-50 border border-primary text-black"
                  } py-2 px-4 ms-2`}
                >
                  <input
                    type="radio"
                    id="false"
                    name="option"
                    value="False"
                    className="mb-3 hidden"
                    onChange={(e) => choiceAnswer(e.target.value)}
                    checked={isChoice === "False"}
                  />
                  <label htmlFor="false" className="cursor-pointer">
                    False
                  </label>
                  <br />
                </div>
              </div>
            </form>
            <h3 className="text-lg md:text-xl font-semibold mt-16">
              Explanation
            </h3>
            <p className="mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloremque animi ad non maiores aliquam voluptatum, sed tempora?
              Magni, consectetur ipsa facere nam cum laudantium molestiae optio
              neque, voluptatum quidem officia possimus impedit, incidunt in
              itaque sit quisquam atque exercitationem hic modi? Ullam
              consectetur harum non voluptatum atque molestiae tenetur cumque.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-lg">
          <Skeleton height="300px" />
        </div>
      )}
    </div>
  );
};

export default QuestionSection;
