import React, { ReactNode } from "react";
import Para2 from "./Para2";

type VisionCardProps = {
  icon: ReactNode;
  alt: string;
  title: string;
  description?: string;
};

const VisionCard: React.FC<VisionCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 items-center px-12 py-14 rounded-2xl bg-background-b3 max-w-sm min-w-xs">
      {icon}

      <h6 className="text-white text-lg lg:text-3xl text-center md:text-xl font-bold max-w-xl mx-auto">
        {title}
      </h6>

      <Para2>{description}</Para2>
    </div>
  );
};

export default VisionCard;
