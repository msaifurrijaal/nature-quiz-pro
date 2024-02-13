import React, { useState, useRef, useEffect } from "react";

interface Time {
  total: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimerPage: React.FC = () => {
  const [timer, setTimer] = useState<string>("00:00:00");
  const Ref = useRef<number | null>(null);

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

      // Simpan sisa detik ke dalam localStorage
      localStorage.setItem("remainingSeconds", total.toString());

      setTimer(formattedTimer);
    } else {
      // Handle timer ending scenario
    }
  };

  const clearTimer = (endTime: Date) => {
    setTimer("00:10:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (): Date => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 600); // Menambah 600 detik (10 menit)
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h1 style={{ color: "green" }}>GeeksforGeeks</h1>
      <h3>Countdown Timer Using React JS</h3>
      <h2>{timer}</h2>
    </div>
  );
};

export default TimerPage;
