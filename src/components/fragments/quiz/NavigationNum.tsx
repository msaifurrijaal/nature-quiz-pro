import { Link } from "react-router-dom";
import { Question } from "../../../types/QuestionType";
import Button from "../../elements/button";

type NavigationNumProps = {
  questions: Question[];
  index: number;
  timer: string;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const NavigationNum = ({
  questions,
  index,
  timer,
  setIndex,
}: NavigationNumProps) => {
  return (
    <div className="w-full md:w-1/3 py-4 md:pe-4">
      <div className="w-full rounded-lg border shadow-sm p-4">
        {questions && questions.length > 0 && (
          <div>
            <div className="flex justify-between items-center">
              <p className="text-lg md:text-xl font-semibold">
                Question {index + 1} / {questions.length}
              </p>
              <p className="text-lg md:text-xl font-semibold bg-slate-100 py-1 px-2 rounded-lg">
                {timer}
              </p>
            </div>

            <div className="flex flex-wrap justify-start items-center mt-6">
              {questions.map((question: Question, indexNum) => (
                <Link
                  to=""
                  onClick={() => setIndex(indexNum)}
                  key={question.question}
                  className={`py-2 px-4 ${
                    indexNum === index
                      ? "bg-yellow-500 border border-yellow-500"
                      : "border border-yellow-500"
                  } mx-1 mb-2 rounded-lg`}
                >
                  <p>{indexNum + 1}</p>
                </Link>
              ))}
            </div>
            <div className="flex mt-4">
              <Button
                onClick={() =>
                  setIndex((prev) => (prev !== 0 ? prev - 1 : prev))
                }
                classname="bg-yellow-500 text-white hover:bg-yellow-700 me-1"
              >
                Prev
              </Button>
              <Button
                onClick={() =>
                  setIndex((prev) =>
                    prev !== questions.length - 1 ? prev + 1 : prev
                  )
                }
                classname="bg-yellow-500 text-white hover:bg-yellow-700 ms-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationNum;
