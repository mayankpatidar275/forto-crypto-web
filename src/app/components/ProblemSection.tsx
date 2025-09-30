import {
  Banknote,
  CheckCircle2,
  Coins,
  Gift,
  Ticket,
  Trophy,
  Wallet,
} from "lucide-react";

import Heading2 from "../components-website-3.0/ui/Heading2";
import ProblemCard, { Problem } from "./ui/ProblemCard";

const problems: Problem[] = [
  {
    title: "How is Forto different from normal giveaways?",
    description:
      "Traditional giveaways pick 1 winner. With Forto, 50% of participants win, making it the fairest chance you'll ever get.",
    icon: <Ticket size={32} className="text-brand-br1" />,
    alt: "Ticket Icon",
  },
  {
    title: "Is winning really 50/50?",
    description:
      "Yes! Half the participants in every draw walk away with real store credits. Your odds are higher than anywhere else.",
    icon: <Trophy size={32} className="text-brand-br1" />,
    alt: "Trophy Icon",
  },
  {
    title: "What kind of rewards can I win?",
    description:
      "Rewards are store credits from top brands. Use them instantly to shop fashion, beauty, tech, or lifestyle products you already love.",
    icon: <Wallet size={32} className="text-brand-br1" />,
    alt: "Wallet Icon",
  },
  {
    title: "What makes it fair?",
    description:
      "Every draw is powered by blockchain technology, which records results transparently. No rigging, no bias — just provably fair outcomes.",
    icon: <Coins size={32} className="text-brand-br1" />,
    alt: "Coins Icon",
  },
  {
    title: "Can I win more than once?",
    description:
      "Absolutely. Each draw is fresh. Join multiple giveaways, and you could keep stacking wins.",
    icon: <Gift size={32} className="text-brand-br1" />,
    alt: "Gift Icon",
  },
  {
    title: "Do I need crypto or a wallet to join?",
    description:
      "Not at all! Forto hides the tech complexity. Just enter with your details and OTP — it's that simple.",
    icon: <Banknote size={32} className="text-brand-br1" />,
    alt: "Banknote Icon",
  },
  {
    title: "How is the 50% winner pool divided, and what do winners get?",
    description: `The prize pool is split into 3 categories:
                  - 5% of participants win 10% of the prize pool (Mega winners).
                  - 20% of participants win 40% of the prize pool (Mid-tier winners).
                  - 30% of participants win 40% of the prize pool (Micro winners).`,
    icon: <CheckCircle2 size={32} className="text-brand-br1" />,
    alt: "Check Icon",
  },
];

const ProblemSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col w-full justify-center items-center">
        {/* <Label text="FAQs" /> */}
        <Heading2>FAQs</Heading2>
        {/* <div className="mb-8">
          <Para1>Got questions? We have got answers</Para1>
        </div> */}
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
