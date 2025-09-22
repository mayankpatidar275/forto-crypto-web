import React from "react";
import clsx from "clsx";

type Para1Props = {
  children: React.ReactNode;
  className?: string;
};

const Para1: React.FC<Para1Props> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "text-lg text-center md:text-xl font-semibold text-background max-w-xl leading-9",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Para1;
