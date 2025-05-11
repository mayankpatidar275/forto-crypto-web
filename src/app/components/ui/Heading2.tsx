import React from "react";

type Heading2Props = {
  children: React.ReactNode;
};

const Heading2: React.FC<Heading2Props> = ({ children }) => {
  return (
    <h2 className="heading text-4xl font-extrabold md:text-5xl lg:text-6xl text-center max-w-[58.75rem] leading-none mb-8">
      {children}
    </h2>
  );
};

export default Heading2;
