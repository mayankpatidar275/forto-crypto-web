import React from "react";

type Para2Props = {
  children: React.ReactNode;
};

const Para2: React.FC<Para2Props> = ({ children }) => {
  return (
    <p className="text-md text-center md:text-xl text-link font-semibold max-w-xl mx-auto">
      {children}
    </p>
  );
};

export default Para2;
