import React from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import SolutionCard from "./ui/SolutionCard";

const solutions = [
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0ef91d7de0cb76f9a_clock.svg",
    alt: "Clock Icon",
    title: "Training AI is Expensive & Time-Consuming",
    description:
      "Our optimized models reduce training time and computational costs by up to 60%, making AI development more accessible.",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0169b26a93f279d87_bar-chart.svg",
    alt: "Chart Icon",
    title: "Data Quality Limits AI Performance",
    description:
      "We leverage high-quality, expertly curated datasets to train our AI models, ensuring precision, fairness, and adaptability across industries.",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0503a9f401870508e_compass.svg",
    alt: "Compass Icon",
    title: "Scaling AI Requires Complex Infrastructure",
    description:
      "Our AI models are designed for seamless scalability, running efficiently on both cloud-based and on-premise infrastructures.",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0ea3320bf53a264ee_help-circle.svg",
    alt: "Question Icon",
    title: "Keeping Up with AI Advancements is Challenging",
    description:
      "Stay ahead with our continuously evolving AI models, designed for cutting-edge applications in various industries.",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e74a94f60aa14f3a2b585_database.svg",
    alt: "Database Icon",
    title: "AI Models Struggle to Adapt to New Data",
    description:
      "With automated retraining pipelines and self-improving algorithms, our models evolve alongside your business, ensuring long-term accuracy.",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e74a9e1e65a291b0650fe_file-text.svg",
    alt: "File Icon",
    title: "Lack of Explainability and Trust in AI Decisions",
    description:
      "We develop AI models with explainability at their core, integrating interpretable architectures and transparent reporting.",
  },
];

function WhatSection() {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="WHAT WE DO" />
        <Heading2>
          Your AI models <br /> deserve better
        </Heading2>
        <div className="mb-8">
          <Para1>
            Building AI is challenging, but it should not be a roadblock. We
            solve the biggest hurdles in AI training—so you can focus on
            innovation, not limitations.
          </Para1>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              alt={solution.alt}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatSection;
