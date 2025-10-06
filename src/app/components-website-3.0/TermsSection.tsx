import React from "react";
import Heading2 from "./ui/Heading2";

const TermsSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl">
        {/* Right Content */}
        <div className="flex flex-col items-center gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="mb-0">Participation Terms</Heading2>
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-background rounded-2xl w-full">
              <div className="relative">
                {/* <Heading3>{title}</Heading3> */}
                <div className="text-sm text-text-color max-w-6xl mx-auto text-justify">
                  <span className="text-white"> Account Creation:</span> To
                  claim your reward, create an account on the brand&apos;s
                  website or app using the same email you used for the FORTO
                  giveaway, before the reward date.
                  <br />
                  <br />
                  <span className="text-white"> Reward Eligibility:</span> If
                  you don&apos;t create an account by the reward date, you
                  won&apos;t receive your reward, and neither FORTO nor the
                  brand will be responsible for it
                </div>
              </div>
            </div>
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

export default TermsSection;
