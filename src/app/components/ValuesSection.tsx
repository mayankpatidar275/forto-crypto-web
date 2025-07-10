import React from "react";
import Image from "next/image";
import ValueCard from "./ui/ValueCard";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";

const values = [
  {
    title: "Innovation First",
    description: "Pushing AI forward with cutting-edge research.",
  },
  {
    title: "Ethics & Responsibility",
    description: "AI must be fair, transparent, and for the greater good.",
  },
  {
    title: "Collaboration Wins",
    description: "The best solutions come from teamwork.",
  },
  {
    title: "Performance at Scale",
    description: "Powerful, efficient AI for everyone.",
  },
];

const ValuesSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="Core Values" />
        <Heading2>
          The Principles <br /> That Drive Us
        </Heading2>
        <div className="mb-8">
          <Para1>
            We Don’t Just Build AI—We Build Trust, Performance, and Impact.
          </Para1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-6">
          {/* Left Content */}
          <div className="flex flex-col gap-4">
            {values.map((val, index) => (
              <ValueCard
                key={index}
                title={val.title}
                description={val.description}
              />
            ))}
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center gap-6">
            <figure className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden">
              <Image
                src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif"
                alt="Decorative shape"
                width={800}
                height={600}
                sizes="(max-width: 767px) 83vw, 500px"
                className="h-full max-w-full w-auto inline-block"
                priority={false}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
