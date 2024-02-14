import { Link } from "react-router-dom";
import Button from "../../elements/button";
import { Answer, UserAnswer } from "../../../types/UserAnswer";
import Timer from "../../elements/timer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type NavigationNumProps = {
  userAnswer: UserAnswer;
  index: number;
  status: string | undefined;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setUserAnswer: React.Dispatch<React.SetStateAction<UserAnswer>>;
};

const NavigationNum = ({
  userAnswer,
  index,
  status,
  setIndex,
  setUserAnswer,
}: NavigationNumProps) => {
  return (
    <div className="w-full md:w-1/3 py-4 md:pe-4">
      {userAnswer && userAnswer.answer.length > 0 ? (
        <div className="w-full rounded-lg border shadow-sm p-4">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-lg md:text-xl font-semibold">
                Question {index + 1} / {userAnswer.answer.length}
              </p>
              <Timer status={status} setUserAnswer={setUserAnswer} />
            </div>

            <div className="flex flex-wrap justify-start items-center mt-6">
              {userAnswer.answer.map((answer: Answer, indexNum) => (
                <Link
                  to=""
                  onClick={() => setIndex(indexNum)}
                  key={indexNum}
                  className={`py-2 px-4 ${
                    indexNum !== index
                      ? answer.answer === ""
                        ? "border border-yellow-500"
                        : "bg-slate-500 border border-slate-500 text-white"
                      : "bg-yellow-500 border border-yellow-500"
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
                    prev !== userAnswer.answer.length - 1 ? prev + 1 : prev
                  )
                }
                classname="bg-yellow-500 text-white hover:bg-yellow-700 ms-1"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-lg">
          <Skeleton height="220px" />
        </div>
      )}
    </div>
  );
};

export default NavigationNum;
