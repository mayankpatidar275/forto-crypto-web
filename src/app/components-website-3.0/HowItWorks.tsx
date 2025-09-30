import React from "react";
// import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
// import Para1 from "./ui/Para1";
import SolutionCard from "./ui/SolutionCard";
import { Tally1, Tally2, Tally3, Tally4 } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="cp-x cp-y flex justify-center customer-section">
      <div className="max-w-6xl">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="lg:text-left">How FORTO works</Heading2>
          <div className="flex flex-col gap-4">
            <SolutionCard
              title="Enter the Giveaway"
              icon={Tally1}
              alt={""}
              description="→ Simply join a draw by filling out a quick form and verifying your details."
            />
            <SolutionCard
              title="Transparent Blockchain Draw"
              icon={Tally2}
              alt={""}
              description="→ Our blockchain-powered draw ensures 50% winners with provably fair and verifiable results."
            />
            <SolutionCard
              title="Win Big, Shop Bigger"
              icon={Tally3}
              alt={""}
              description="→ 5% win 10% of the prize pool (Mega), 20% win 40% (Mid), and 30% win 40% (Micro)."
            />
            <SolutionCard
              title="Redeem and Shop"
              icon={Tally4}
              alt={""}
              description="→ Use your store credits instantly on your favorite brands with no waiting — just pure shopping power."
            />
          </div>
          {/* <Para1 className="lg:text-left hidden md:flex">
            <ul>
              <li>1. 50% Chance to win in every draw </li>
              <li>2. Rewards redeemable instantly </li>
              <li>3. Transparent draws you can trust </li>
              <li> 4. Rewards that turn into real shopping</li>
            </ul>
          </Para1> */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
