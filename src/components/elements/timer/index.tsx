import { useEffect, useRef, useState } from "react";
import { Time } from "../../../types/Time";
import { UserAnswer } from "../../../types/UserAnswer";

type TimerProps = {
  status: string | undefined;
  setUserAnswer: React.Dispatch<React.SetStateAction<UserAnswer>>;
};

const Timer = ({ status, setUserAnswer }: TimerProps) => {
  const [timer, setTimer] = useState<string>("00:00:00");
  const Ref = useRef<number | null>(null);

  useEffect(() => {
    clearTimer(getDeadTime());

    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

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
    let { hours, minutes, seconds } = getTimeRemaining(endTime);
    const formattedTimer =
      (hours > 9 ? hours : "0" + hours) +
      ":" +
      (minutes > 9 ? minutes : "0" + minutes) +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);

    setTimer(formattedTimer);

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
    <p className="text-lg md:text-xl font-semibold bg-slate-100 py-1 px-2 rounded-lg">
      {timer}
    </p>
  );
};

export default Timer;
