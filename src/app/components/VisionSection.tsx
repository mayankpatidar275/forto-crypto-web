import { Calendar, DollarSign, Users } from "lucide-react";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import VisionCard from "./ui/VisionCard";

const solutions = [
  {
    icon: <Calendar size={64} className="text-brand-br1" />,
    alt: "Founded In",
    title: "Founded In",
    description: "2025",
  },
  {
    icon: <DollarSign size={64} className="text-brand-br1" />,
    alt: "Prices distributed",
    title: "Prices distributed",
    description: "USD 10k +",
  },
  {
    icon: <Users size={64} className="text-brand-br1" />,
    alt: "Users",
    title: "Users",
    description: "105 +",
  },
];

function VisionSection() {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="Vision" /> */}
        <Heading2>Our Vision</Heading2>
        <div className="mb-8">
          <Para1>
            We want to create a democratic, long-term sweepstake experience
            where luck meets opportunity, and every ticket counts
          </Para1>
        </div>
        <div className="flex flex-wrap justify-center gap-6 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((solution, index) => (
              <VisionCard
                key={index}
                icon={solution.icon}
                alt={solution.alt}
                title={solution.title}
                description={solution.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionSection;
