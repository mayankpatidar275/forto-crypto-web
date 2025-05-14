import React from "react";
import Para from "./Para";

const ValueCard = ({ title, description }: any) => {
  return (
    <div className="border-b border-border py-6 pr-2 flex flex-col gap-4">
      <h6 className="text-white text-lg lg:text-3xl md:text-xl font-bold max-w-xl">
        {title}
      </h6>
      <Para>{description}</Para>
    </div>
  );
};

export default ValueCard;
