import React from "react";
import SolutionCard from "./ui/SolutionCard";
import { Coins, Handshake, ShoppingBag, Sparkle } from "lucide-react";
import Heading4 from "./ui/Heading4";

const BrandsTurnGiveaways = () => {
  return (
    <section className="cp-x cp-y flex justify-center brands-section">
      <div className="max-w-6xl gap-10 items-start">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading4 className="lg:text-left">
            BRANDS: TURN GIVEAWAYS INTO GROWTH
          </Heading4>
          <div className="flex flex-col gap-4">
            <SolutionCard
              title="Only pay when rewards drive sales"
              icon={Coins}
              alt={""}
              description="No wasted spend — you only pay when customers redeem"
            />
            <SolutionCard
              title="Engagement that fuels revenue"
              icon={Sparkle}
              alt={""}
              description="Every draw attracts first-time buyers eager to shop your brand"
            />
            <SolutionCard
              title="Attract new customers and build loyal database"
              icon={Handshake}
              alt={""}
              description="Giveaways drive purchases, boost order value, and grow revenue"
            />
            <SolutionCard
              title="Transparent draws building customer trust"
              icon={ShoppingBag}
              alt={""}
              description="Transparent draws win trust, spark buzz, and boost loyalty"
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

export default BrandsTurnGiveaways;
