// components/ui/StatCard.tsx

import React from "react";
import clsx from "clsx";
import Para1 from "./Para1";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className }) => {
  return (
    <div
      className={clsx(
        "gradient-card-bg bg-background-b3 p-12 rounded-2xl shadow-md w-1/2",
        className
      )}
    >
      <h3 className="text-3xl lg:text-6xl font-bold md:text-5xl lg:font-extrabold">
        {value}
      </h3>
      <Para1 className="text-left ml-0">{label}</Para1>
    </div>
  );
};

export default StatCard;
