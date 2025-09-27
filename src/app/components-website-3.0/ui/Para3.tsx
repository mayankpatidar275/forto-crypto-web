import React from "react";

type Para3Props = {
  children: React.ReactNode;
};

const Para3: React.FC<Para3Props> = ({ children }) => {
  return (
    <p className="text-md text-left md:text-xl text-text-color font-semibold max-w-xl mx-auto">
      {children}
    </p>
  );
};

export default Para3;
