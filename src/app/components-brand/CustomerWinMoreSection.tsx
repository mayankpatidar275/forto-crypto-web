import React from "react";
// import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import Image from "next/image";
import { CustomersWinMore } from "../assets";

const CustomerWinMoreSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="lg:text-left">
            CUSTOMERS: WIN MORE AND SHOP SMARTER
          </Heading2>
          <Para1 className="lg:text-left">
            <ul>
              <li>1. 50% Chance to win in every draw </li>
              <li>2. Rewards redeemable instantly </li>
              <li>3. Transparent draws you can trust </li>
              <li> 4. Rewards that turn into real shopping</li>
            </ul>
          </Para1>
        </div>

        {/* Left Content */}
        <div className="flex flex-col items-center gap-6">
          <figure className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden">
            <Image
              src={CustomersWinMore}
              alt="Decorative shape"
              width={800} // pick an appropriate width (can adjust)
              height={600} // pick an appropriate height (can adjust)
              sizes="(max-width: 767px) 83vw, 500px"
              className="h-full max-w-full w-auto inline-block"
              priority={false}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default CustomerWinMoreSection;
