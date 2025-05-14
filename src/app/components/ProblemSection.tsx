import React from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import ProblemCard, { Problem } from "./ui/ProblemCard";

const problems: Problem[] = [
  {
    title: "Complex Infrastructure Needs",
    description:
      "Deploying AI across multiple environments—whether on-premise or in the cloud—often comes with significant technical hurdles. Our models are built for seamless scalability, effortlessly adapting to both cloud-based and hybrid infrastructures. With streamlined deployment and minimal configuration, you can integrate AI solutions across your ecosystem without the usual complexity or operational overhead.",
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f1730229d85dbd33f287c_monitor.svg",
    alt: "Monitor Icon",
  },
  {
    title: "Slow & Costly AI Training",
    description:
      "Training AI models can be expensive and time-consuming, often requiring extensive computational resources. Our models are designed to train 3x faster while reducing compute costs by up to 50%, allowing you to achieve high-performance AI without breaking the bank. Whether you’re working with massive datasets or fine-tuning complex models, we optimize training efficiency to deliver faster results with lower infrastructure expenses.",
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f173079653f84026a145c_dollar-sign.svg",
    alt: "Dollar Icon",
  },
  {
    title: "Low-Quality & Biased Data",
    description:
      "Poor-quality datasets can lead to inaccurate and biased AI models, impacting performance and fairness. We leverage high-quality, curated datasets that enhance model accuracy, reduce bias, and improve generalization. By ensuring data integrity and diversity, we help businesses build reliable AI solutions that drive better decision-making while maintaining ethical and unbiased outputs.",
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f1730c06be5ba91ca6b54_hard-drive.svg",
    alt: "Hardrive Icon",
  },
  {
    title: "Difficult AI Deployment",
    description:
      "Bringing AI into production shouldn't be a bottleneck. We simplify deployment with plug-and-play integrations for major cloud providers. Whether you're running inference in real-time or deploying models at scale, our solutions ensure a frictionless, reliable, and optimized deployment process, accelerating time-to-market for your AI innovations.",
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f1730770cf162dccf7d19_cpu.svg",
    alt: "CPU Icon",
  },
];

const ProblemSection = () => {
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
        <div className="grid grid-cols-1 gap-6 w-full">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
