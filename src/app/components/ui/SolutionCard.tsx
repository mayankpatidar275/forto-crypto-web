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
    <div className="flex flex-col gap-4 items-center px-12 py-14 rounded-2xl bg-background-b3 max-w-sm">
      <img src={icon} alt={alt} className="w-14 h-14" />
      <Para1>
        <h6 className="text-white">{title}</h6>
      </Para1>
      <Para2>{description}</Para2>
    </div>
  );
};

export default SolutionCard;
