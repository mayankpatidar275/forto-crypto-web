import React from "react";
// import Label from "./ui/Label";
// import Para1 from "./ui/Para1";
import Image from "next/image";
import { BrandTurnsGiveaways } from "../assets";
import SolutionCard from "./ui/SolutionCard";
import { Coins, Handshake, ShoppingBag, Sparkle } from "lucide-react";
import Heading4 from "./ui/Heading4";

const BrandsTurnGiveaways = () => {
  return (
    <section className="cp-x cp-y flex justify-center brands-section">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Content */}
        <div className="lg:flex flex-col items-center gap-6 hidden">
          <figure className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden">
            <Image
              src={BrandTurnsGiveaways}
              alt="Decorative shape"
              width={800} // pick an appropriate width (can adjust)
              height={600} // pick an appropriate height (can adjust)
              sizes="(max-width: 767px) 83vw, 500px"
              className="h-full max-w-full w-auto inline-block"
              priority={false}
            />
          </figure>
        </div>
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-end gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading4 className="">BRANDS: TURN GIVEAWAYS INTO GROWTH</Heading4>
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
