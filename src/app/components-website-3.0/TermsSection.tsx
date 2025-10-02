import React from "react";
import Heading2 from "./ui/Heading2";

const TermsSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl">
        {/* Right Content */}
        <div className="flex flex-col items-center gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="mb-0">Terms & Conditions</Heading2>
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-background rounded-2xl w-full">
              <div className="relative">
                {/* <Heading3>{title}</Heading3> */}
                <div className="text-sm text-text-color max-w-6xl mx-auto text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                  culpa iusto animi facilis fugit, amet tempora esse omnis,
                  repudiandae numquam molestias harum cupiditate dolor aperiam?
                  Consequuntur natus ut dignissimos officiis. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Dignissimos aliquid
                  ipsa cupiditate ipsam laudantium autem impedit dolor
                  distinctio illo quo, harum nobis magnam, vitae accusantium.
                  Hic, consequatur. Saepe, officia possimus. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Eligendi, labore
                  adipisci. Inventore ea maxime soluta nesciunt dolores.
                  Voluptas neque, maiores explicabo reiciendis ut distinctio
                  animi! Soluta a neque laborum dicta! Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Aspernatur, repellendus
                  nesciunt veniam quibusdam dolorum aut doloribus minima
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
