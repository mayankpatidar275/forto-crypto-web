import React from "react";
import clsx from "clsx";

type ParaProps = {
  children: React.ReactNode;
  className?: string;
};

const Para: React.FC<ParaProps> = ({ children, className }) => {
  return (
    <p className={clsx("md:text-lg text-link leading-relaxed", className)}>
      {children}
    </p>
  );
};

export default Para;
