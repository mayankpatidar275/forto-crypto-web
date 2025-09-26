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
        "text-2xl text-center md:text-3xl font-semibold text-background-b1 opacity-75 max-w-3xl leading-9",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Para1;
