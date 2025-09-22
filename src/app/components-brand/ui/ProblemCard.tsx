"use client";

import React, { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Para from "./Para";

export interface Problem {
  title: string;
  description: string;
  icon: ReactNode;
  alt: string;
}

const ProblemCard: React.FC<Problem> = ({ title, description, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background-b3 rounded-[15px] p-6 text-left transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">{icon}</div>
          <h6 className="text-white text-left text-lg lg:text-2xl md:text-xl font-bold">
            {title}
          </h6>
        </div>
        <div className="text-white">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4">
          <Para className="text-left text-sm text-white">{description}</Para>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
