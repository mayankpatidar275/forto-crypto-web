import React from "react";
import Para2 from "./Para2";
import Para1 from "./Para1";

export interface Feature {
  title: string;
  description: string;
  icon: string;
  alt: string;
}

const FeatureCard: React.FC<Feature> = ({ title, description, icon, alt }) => {
  return (
    <div className="bg-background-b3 text-left rounded-[15px] flex flex-col items-start justify-start min-h-[12.5rem] p-10">
      <div className="flex items-center gap-2 mb-6">
        <img
          src={icon}
          alt={alt}
          className="w-10 h-10 object-contain mr-2"
          loading="lazy"
        />
        <h6 className="text-white text-lg lg:text-3xl text-center md:text-xl font-bold max-w-xl mx-auto">
          {title}
        </h6>
      </div>
      <Para1 className="text-left mb-6">{description}</Para1>
    </div>
  );
};

export default FeatureCard;
