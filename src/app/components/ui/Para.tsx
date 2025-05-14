import React from "react";

type ParaProps = {
  children: React.ReactNode;
};

const Para: React.FC<ParaProps> = ({ children }) => {
  return <p className="md:text-lg text-link max-w-xl">{children}</p>;
};

export default Para;
