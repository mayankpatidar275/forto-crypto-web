import React from "react";
import clsx from "clsx";
import { funnel } from "@/app/layout";

type Heading3Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading3: React.FC<Heading3Props> = ({ children, className }) => {
  return (
    <h2
      className={clsx(
        "text-left text-xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-heading to-brand-br1 leading-tight mb-2 max-w-5xl",
        className,
        funnel.className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading3;
