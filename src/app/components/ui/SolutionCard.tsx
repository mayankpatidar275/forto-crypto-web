import React from "react";
import Para1 from "./Para1";
import Para2 from "./Para2";

type SolutionCardProps = {
  icon: string;
  alt: string;
  title: string;
  description: string;
};

const SolutionCard: React.FC<SolutionCardProps> = ({
  icon,
  alt,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 items-center px-12 py-14 rounded-2xl bg-background-b3 max-w-sm">
      <img src={icon} alt={alt} className="w-14 h-14" />

      <h6 className="text-white text-lg lg:text-3xl text-center md:text-xl font-bold max-w-xl mx-auto">
        {title}
      </h6>

      <Para2>{description}</Para2>
    </div>
  );
};

export default SolutionCard;
