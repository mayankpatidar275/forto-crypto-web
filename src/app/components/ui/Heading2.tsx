import React from "react";
import clsx from "clsx";

type Heading2Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading2: React.FC<Heading2Props> = ({ children, className }) => {
  return (
    <h2
      className={clsx(
        "text-4xl font-extrabold md:text-5xl lg:text-6xl text-center max-w-[58.75rem] leading-none mb-8",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading2;
