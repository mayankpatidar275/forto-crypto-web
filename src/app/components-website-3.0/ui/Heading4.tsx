import React from "react";
import clsx from "clsx";
import { funnel } from "@/app/layout";

type Heading4Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading4: React.FC<Heading4Props> = ({ children, className }) => {
  return (
    <h2
      className={clsx(
        "text-center text-2xl md:text-6xl lg:text-7xl font-bold text-background bg-clip-text leading-tight mb-2 max-w-5xl",
        className,
        funnel.className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading4;
