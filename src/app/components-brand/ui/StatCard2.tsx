// components/ui/StatCard.tsx

import React, { ReactNode } from "react";
import clsx from "clsx";
import Para1 from "./Para1";
import Link from "next/link";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  icon: ReactNode;
  href: string;
}

const StatCard2: React.FC<StatCardProps> = ({
  value,
  label,
  className,
  href,
  icon,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "gradient-card-bg bg-background-b3 p-8 rounded-2xl shadow-md w-full flex justify-between items-center",
        className
      )}
    >
      <div>
        <h3 className="text-xl lg:text-4xl font-bold md:text-3xl lg:font-extrabold">
          {value}
        </h3>
        <Para1 className="text-left ml-0">{label}</Para1>
      </div>
      {icon}
    </Link>
  );
};

export default StatCard2;
