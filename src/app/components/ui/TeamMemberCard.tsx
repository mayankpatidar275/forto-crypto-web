import React from "react";
import Para from "./Para";
import Para1 from "./Para1";

export type TeamMember = {
  imageUrl: string;
  name: string;
  role: string;
  quote: string;
  linkedin: string;
};

const TeamMemberCard: React.FC<TeamMember> = ({
  imageUrl,
  name,
  role,
  quote,
  linkedin,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center p-6 rounded-xl bg-background-b3 text-center">
      <img
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-full object-cover grayscale mb-4"
      />
      <h5 className="text-2xl font-bold text-white mb-2">{name}</h5>
      <Para1>{role}</Para1>
      <Para className="italic">{quote}</Para>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-br1 hover:text-white transition-all mt-2 text-lg"
      >
        LinkedIn
      </a>
    </div>
  );
};

export default TeamMemberCard;
