import React from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import TeamMemberCard, { TeamMember } from "./ui/TeamMemberCard";

const teamMembers: TeamMember[] = [
  {
    imageUrl:
      "https://cdn.prod.website-files.com/679e441b90452288c5c37443/67a2326e4b443665ed83f58d_pexels-moose-photos-170195-1587009%201.avif",
    name: "Jane Doe",
    role: "CEO & AI Strategist",
    quote: "Pushing the boundaries of AI scalability",
    linkedin: "https://www.linkedin.com/",
  },
  {
    imageUrl:
      "https://cdn.prod.website-files.com/679e441b90452288c5c37443/67a2326e4b443665ed83f58d_pexels-moose-photos-170195-1587009%201.avif",
    name: "Luc Smith",
    role: "Head of Research",
    quote: "Building the next generation of intelligent models",
    linkedin: "https://www.linkedin.com/",
  },
  {
    imageUrl:
      "https://cdn.prod.website-files.com/679e441b90452288c5c37443/67a2326e4b443665ed83f58d_pexels-moose-photos-170195-1587009%201.avif",
    name: "Marie Klerk",
    role: "Lead Engineer",
    quote: "Optimizing AI for real-world performance",
    linkedin: "https://www.linkedin.com/",
  },
  {
    imageUrl:
      "https://cdn.prod.website-files.com/679e441b90452288c5c37443/67a2326e4b443665ed83f58d_pexels-moose-photos-170195-1587009%201.avif",
    name: "Mike Fo",
    role: "Lead Marketing",
    quote: "Exploring new ways to communicate",
    linkedin: "https://www.linkedin.com/",
  },
];

const PeopleSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="Contact" />
        <Heading2>
          AI That Works <br /> for Everyone
        </Heading2>
        <div className="mb-8">
          <Para1>
            Our Vision for a Smarter, Fairer, and More Responsible AI Future We
            believe AI should be :
          </Para1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
