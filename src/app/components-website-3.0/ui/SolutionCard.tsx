import React from "react";
import { LucideProps } from "lucide-react";
import Heading3 from "./Heading3";
import Para3 from "./Para3";

type SolutionCardProps = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  alt: string;
  title: string;
  description?: string;
};

const SolutionCard: React.FC<SolutionCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 bg-background-b4 rounded-2xl w-full">
      <div className="relative">
        <Heading3>{title}</Heading3>
        <Para3>{description}</Para3>
        <div className="icon-box mt-6 bg-[#321d1a] h-12 w-12 ml-auto rounded-full flex justify-center items-center">
          <Icon className="w-6 h-6 text-[#834543]" />
        </div>
        <div className="feature-dot bg-[#2e2118] h-2.5 w-2.5 rounded-full absolute right-0 top-0"></div>
        <div className="feature-dot bg-[#2e2118] h-2.5 w-2.5 rounded-full absolute left-0 bottom-0"></div>
      </div>
    </div>
  );
};

export default SolutionCard;
