import React from "react";
import { LucideProps } from "lucide-react";

type SolutionCardProps = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  alt: string;
  title: string;
};

const SolutionCard: React.FC<SolutionCardProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex gap-4 lg:gap-6 items-center px-4 py-4 rounded-2xl bg-brand-br max-w-sm min-w-xs opacity-75">
      <div className="h-full p-1">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h6 className="text-white text-left text-lg lg:text-xl md:text-xl font-bold max-w-2xl">
        {title}
      </h6>
    </div>
  );
};

export default SolutionCard;
