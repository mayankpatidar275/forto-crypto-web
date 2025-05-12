import React from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import clsx from "clsx";
import StatCard from "./ui/StatCard";

const stats = [
  { value: "3X", label: "Faster Training" },
  { value: "50%", label: "Lower Costs" },
  { value: "98%", label: "Model Accuracy" },
  { value: "100+", label: "Clients Worldwide" },
];

const WhySection = () => {
  return (
    <section className="cp-x py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <Label text="TRAIN LIKE A BEAST" />
          <Heading2 className="lg:text-left">
            Why Our AI Trainers Make a Difference
          </Heading2>
          <Para1 className="lg:text-left">
            AI training shouldn’t be a bottleneck—it should be an accelerator.
            Our models are built for efficiency, precision, and scalability,
            helping you achieve faster training times, reduced costs, and higher
            accuracy. Whether you're optimizing large-scale machine learning
            pipelines or fine-tuning models for specific applications, our
            technology ensures maximum performance with minimal resources.
          </Para1>
        </div>

        {/* Right Stats: Mobile View */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          {stats.map((item, index) => (
            <StatCard key={index} value={item.value} label={item.label} />
          ))}
        </div>

        {/* Right Stats: Desktop View */}
        <div className="flex flex-col items-center gap-6 lg:flex overflow-hidden">
          <div className="flex w-full">
            <StatCard
              value={stats[0].value}
              label={stats[0].label}
              className="ml-46"
            />
          </div>
          <div className="flex w-full">
            <StatCard value={stats[1].value} label={stats[1].label} />
            <StatCard
              value={stats[2].value}
              label={stats[2].label}
              className="ml-6 gradient-light-card-bg"
            />
          </div>
          <div className="flex w-full">
            <StatCard
              value={stats[3].value}
              label={stats[3].label}
              className="ml-26"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
