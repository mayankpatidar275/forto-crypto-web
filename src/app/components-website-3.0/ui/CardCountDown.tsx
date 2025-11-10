"use client";

import React from "react";

interface CardCountDownProps {
  targetDate: string;
  className?: string;
}

export default function CardCountDown({
  targetDate,
  className = "",
}: CardCountDownProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className={`text-xs font-medium text-red-400 ${className}`}>
        Ended
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {timeLeft.days > 0 && (
        <>
          <TimeUnit value={timeLeft.days} unit="d" />
          <span className="text-gray-400">:</span>
        </>
      )}
      <TimeUnit value={timeLeft.hours} unit="h" />
      <span className="text-gray-400">:</span>
      <TimeUnit value={timeLeft.minutes} unit="m" />
      {timeLeft.days === 0 && (
        <>
          <span className="text-gray-400">:</span>
          <TimeUnit value={timeLeft.seconds} unit="s" />
        </>
      )}
    </div>
  );
}

function TimeUnit({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 rounded px-1.5 py-0.5 min-w-[24px] text-center">
        <span className="text-white text-xs font-mono font-bold">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-gray-400 mt-0.5">{unit}</span>
    </div>
  );
}
