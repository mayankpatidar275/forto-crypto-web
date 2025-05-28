import {
  Ticket,
  Trophy,
  Wallet,
  Coins,
  Gift,
  ShieldCheck,
  HelpCircle,
  Banknote,
  CheckCircle2,
  Building2,
  Info,
} from "lucide-react";

import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import ProblemCard, { Problem } from "./ui/ProblemCard";

const problems: Problem[] = [
  {
    title: "What is Forto Token?",
    description:
      "FortoToken is a next-generation sweepstakes platform powered by blockchain, rewarding patience and participation. Each ticket enters you into multiple long-term draws with growing jackpots — a system built for believers in the long game.",
    icon: <Ticket size={32} className="text-brand-br1" />,
    alt: "Ticket Icon",
  },
  {
    title: "How much can I win?",
    description:
      "Your winnings depend on the prize pool size, number of participants, and how many tickets you hold. For full reward breakdowns, check the Tokenomics page.",
    icon: <Trophy size={32} className="text-brand-br1" />,
    alt: "Trophy Icon",
  },
  {
    title: "How can I buy a ticket?",
    description:
      "Ask the tech team for a walkthrough. Ticket purchasing will soon be fully streamlined through supported wallets like MetaMask and Coinbase.",
    icon: <Wallet size={32} className="text-brand-br1" />,
    alt: "Wallet Icon",
  },
  {
    title: "Can I buy more than one ticket?",
    description:
      "Absolutely! There’s no limit — the more tickets you hold, the higher your chances of winning at each milestone draw.",
    icon: <Coins size={32} className="text-brand-br1" />,
    alt: "Coins Icon",
  },
  {
    title: "How many times can I win?",
    description:
      "Thanks to the Lifetime Ticket Model, each ticket grants entry into multiple scheduled draws over 2 years — 1st month, 6th month, and 2nd year. One ticket, multiple chances to win.",
    icon: <Gift size={32} className="text-brand-br1" />,
    alt: "Gift Icon",
  },
  {
    title: "What is the prize pool?",
    description:
      "60% of the total FortoToken supply is reserved for participant rewards. For complete details, visit the Tokenomics page.",
    icon: <Banknote size={32} className="text-brand-br1" />,
    alt: "Banknote Icon",
  },
  {
    title: "How can I retrieve my winnings?",
    description:
      "Winnings are automatically sent to your wallet — no action needed. You'll also get a confirmation email with transaction details and a blockchain link for verification.",
    icon: <CheckCircle2 size={32} className="text-brand-br1" />,
    alt: "Check Icon",
  },
  {
    title: "What crypto platforms are supported?",
    description:
      "Currently supported: MetaMask and Coinbase. We're expanding soon. If you have a request, contact us via email or social media!",
    icon: <Building2 size={32} className="text-brand-br1" />,
    alt: "Platform Icon",
  },
  {
    title: "Is FortoToken safe?",
    description:
      "Yes. FortoToken uses audited smart contracts, Chainlink VRF for fair draws, multi-sig cold wallets, and a bug bounty program. Full transparency available on the Tokenomics page.",
    icon: <ShieldCheck size={32} className="text-brand-br1" />,
    alt: "Security Icon",
  },
  {
    title: "Do I need to pay taxes on my winnings?",
    description:
      "Possibly — depending on your country's laws and if you convert to fiat. Please consult a licensed tax advisor to know your exact obligations.",
    icon: <Info size={32} className="text-brand-br1" />,
    alt: "Info Icon",
  },
  {
    title: "My question isn’t here. Where can I contact you?",
    description:
      "Reach us via email or social media — we’re happy to help. Full contact details are available in the Contact Us section on our website.",
    icon: <HelpCircle size={32} className="text-brand-br1" />,
    alt: "Help Icon",
  },
];

const ProblemSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="FAQs" /> */}
        <Heading2>FAQs</Heading2>
        <div className="mb-8">
          <Para1>Got questions? We have got answers</Para1>
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
