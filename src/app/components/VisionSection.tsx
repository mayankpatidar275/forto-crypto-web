import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import SolutionCard from "./ui/SolutionCard";

const solutions = [
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0ef91d7de0cb76f9a_clock.svg",
    alt: "Clock Icon",
    title: "Founded In",
    description: "2025",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0169b26a93f279d87_bar-chart.svg",
    alt: "Chart Icon",
    title: "Prices distributed",
    description: "USD 10k +",
  },
  {
    icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0169b26a93f279d87_bar-chart.svg",
    alt: "Chart Icon",
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
        <div className="flex flex-wrap justify-center gap-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </section>
  );
}

export default VisionSection;
