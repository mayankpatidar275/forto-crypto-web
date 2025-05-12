import React from "react";

type Para1Props = {
  children: React.ReactNode;
};

const Para1: React.FC<Para1Props> = ({ children }) => {
  return (
    <div className="text-lg text-center md:text-xl text-link font-semibold max-w-xl mx-auto">
      {children}
    </div>
  );
};

export default Para1;
