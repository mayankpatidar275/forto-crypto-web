"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string | Date;
}

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountDown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!targetDate) return;

    const updateCountDown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setCountDownTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountDownTime({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    const interval = setInterval(updateCountDown, 1000);
    updateCountDown(); // Run immediately before interval starts

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center w-full gap-1.5 count-down-main">
      {(["days", "hours", "minutes", "seconds"] as const).map((unit, index) => (
        <div key={unit} className="flex items-center">
          <div className="timer">
            <div className="rounded-xl border border-brand-br2 py-1.5 min-w-[80px] flex items-center justify-center flex-col gap-0 aspect-square px-1.5">
              <h3 className="countdown-element font-manrope font-semibold text-2xl text-white text-center">
                {countDownTime[unit]}
              </h3>
              <p className="text-sm font-inter capitalize font-normal text-white text-center w-full">
                {unit}
              </p>
            </div>
          </div>
          {index < 3 && (
            <h3 className="font-manrope font-semibold text-2xl text-gray-900"></h3>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountDown;
