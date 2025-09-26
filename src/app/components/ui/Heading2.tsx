import React from "react";
import clsx from "clsx";
import { funnel } from "@/app/layout";

type Heading2Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading2: React.FC<Heading2Props> = ({ children, className }) => {
  return (
    <h2
      className={clsx(
        "text-center md: text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-heading to-brand-br1 leading-tight mb-6 max-w-5xl",
        className,
        funnel.className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading2;
