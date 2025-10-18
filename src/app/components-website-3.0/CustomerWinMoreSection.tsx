import React from "react";
// import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
// import Para1 from "./ui/Para1";
import SolutionCard from "./ui/SolutionCard";
import { Gift, Handshake, Percent, ShoppingBag } from "lucide-react";

const CustomerWinMoreSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center customer-section">
      <div className="max-w-6xl">
        {/* Right Content */}
        <div className="flex flex-col items-center gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="">CUSTOMERS: WIN MORE AND SHOP SMARTER</Heading2>
          <div className="flex flex-col gap-4">
            <SolutionCard
              title="50% Chance to win in every draw"
              icon={Percent}
              alt={""}
              description="Half the players win. Don't sit out — your turn could be next!"
            />
            <SolutionCard
              title="Rewards redeemable instantly"
              icon={Gift}
              alt={""}
              description="Win now, shop now. Credits arrive instantly at checkout."
            />
            <SolutionCard
              title="Transparent draws you can trust"
              icon={Handshake}
              alt={""}
              description="Every draw is on blockchain — provably fair, no hidden tricks."
            />
            <SolutionCard
              title="Rewards that turn into real shopping"
              icon={ShoppingBag}
              alt={""}
              description="Real credits from your favorite brands — shop your wishlist free."
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

export default CustomerWinMoreSection;
