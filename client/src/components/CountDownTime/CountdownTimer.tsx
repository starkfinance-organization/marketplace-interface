import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeLeft(): TimeLeft {
    const targetDate = new Date("2023-09-28T11:59:59"); // Thời gian đếm ngược đến

    const now = new Date().getTime();
    const timeUntilTarget = targetDate.getTime() - now;

    if (timeUntilTarget <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const seconds = Math.floor((timeUntilTarget / 1000) % 60);
    const minutes = Math.floor((timeUntilTarget / 1000 / 60) % 60);
    const hours = Math.floor((timeUntilTarget / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeUntilTarget / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total: timeUntilTarget };
  }

  return (
    <div className="flex gap-2">
      <h1 className=" font-bold text-xl">Mint end: </h1>
      <p>
        <span className="font-bold text-xl text-[#24C3BC]">
          {timeLeft.days}
        </span>{" "}
        days
      </p>
      <p>
        <span className="font-bold text-xl text-[#24C3BC]">
          {timeLeft.hours}{" "}
        </span>
        hours
      </p>
      <p>
        <span className="font-bold text-xl text-[#24C3BC]">
          {timeLeft.minutes}{" "}
        </span>
        minutes
      </p>
      <p>
        <span className="font-bold text-xl text-[#24C3BC]">
          {timeLeft.seconds}{" "}
        </span>
        seconds
      </p>
    </div>
  );
}

export default CountdownTimer;
