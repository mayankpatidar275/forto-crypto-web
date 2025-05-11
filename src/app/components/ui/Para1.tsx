import React from "react";

type Para1Props = {
  children: React.ReactNode;
};

const Para1: React.FC<Para1Props> = ({ children }) => {
  return (
    <p className="text-lg text-center md:text-xl text-link font-semibold max-w-xl mx-auto mb-8">
      {children}
    </p>
  );
};

export default Para1;
