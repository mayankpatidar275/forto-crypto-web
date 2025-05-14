import React from "react";
import Para from "./Para";

export interface Problem {
  title: string;
  description: string;
  icon: string;
  alt: string;
}

const ProblemCard: React.FC<Problem> = ({ title, description, icon, alt }) => {
  return (
    <div className="bg-background-b3 text-left rounded-[15px] flex flex-col items-start justify-start min-h-[12.5rem] p-10">
      <div className="flex items-center gap-2 mb-6">
        <img
          src={icon}
          alt={alt}
          className="w-10 h-10 object-contain mr-2"
          loading="lazy"
        />
        <h6 className="text-white text-lg lg:text-3xl text-center md:text-xl font-bold mx-auto">
          {title}
        </h6>
      </div>
      <Para className="text-left mb-6">{description}</Para>
    </div>
  );
};

export default ProblemCard;
