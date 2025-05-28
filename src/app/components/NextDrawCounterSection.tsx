import { Coins, PartyPopper, Users } from "lucide-react";
import CountDown from "./ui/CountDown";
import Heading2 from "./ui/Heading2";
import Label2 from "./ui/Label2";
import SolutionCard from "./ui/SolutionCard";

const solutions = [
  {
    // icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0ef91d7de0cb76f9a_clock.svg",
    icon: <Coins size={64} className="text-brand-br1" />,
    alt: "Prize Pool",
    title: "Prize Pool",
    description: "USD 100k",
  },
  {
    // icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0169b26a93f279d87_bar-chart.svg",
    icon: <Users size={64} className="text-brand-br1" />,
    alt: "Chart Icon",
    title: "Users",
    description: "USD 1k",
  },
  {
    // icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e64e0169b26a93f279d87_bar-chart.svg",
    icon: <PartyPopper size={64} className="text-brand-br1" />,
    alt: "PartyPopper",
    title: "Jackpot",
    description: "1000",
  },
];

function NextDrawCounterSection() {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="Vision" /> */}
        <Heading2>Next Draw</Heading2>
        {/* <div className="mb-8">
          <Para1>
            We want to create a democratic, long-term sweepstake experience
            where luck meets opportunity, and every ticket counts
          </Para1>
        </div> */}
        <div className="mb-8">
          <CountDown targetDate={getLastDayOfCurrentMonth()} />
        </div>
        <div className="flex flex-wrap justify-center gap-6">
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
        <div className="mt-8">
          <Label2 text="Get Your Ticket" />
        </div>
      </div>
    </section>
  );
}

export const getLastDayOfCurrentMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Day 0 of next month = last day of current
  return lastDay.toISOString();
};

export default NextDrawCounterSection;
